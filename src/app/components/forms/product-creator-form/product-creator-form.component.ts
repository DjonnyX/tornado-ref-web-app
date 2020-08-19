import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IProduct, ITag, IAsset, ICurrency, IPrice, IProductImages, IProductContents, IProductContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';

@Component({
  selector: 'ta-product-creator-form',
  templateUrl: './product-creator-form.component.html',
  styleUrls: ['./product-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlTags = new FormControl([]);

  ctrlPrices = new FormControl([]);

  ctrlReceipt = new FormControl([]);

  @Input() assets: { [lang: string]: Array<IAsset> };

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  private _product: IProduct;
  @Input() set product(product: IProduct) {
    if (product) {
      this._product = product;

      this._state = {...this._state, ...(this._product ? this._product.contents : undefined)};

      this.ctrlTags.setValue(product.tags);
      this.ctrlPrices.setValue(product.prices);
      // this.ctrlReceipt.setValue(product.receipt);
    }
  }

  get product() {
    return this._product;
  }

  @Input() currencies: Array<ICurrency>;

  @Input() isEditMode: boolean;

  @Input() tagList: Array<ITag>;

  @Output() save = new EventEmitter<IProduct>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IProduct>();

  @Output() uploadMainImage = new EventEmitter<IFileUploadEvent>();

  @Output() uploadThumbnailImage = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconImage = new EventEmitter<IFileUploadEvent>();

  private _state: IProductContents = {};

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      tags: this.ctrlTags,
      prices: this.ctrlPrices,
      receipt: this.ctrlReceipt,
    })
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onSave(): void {
    /*const images: IProductImages = { ...this.images };
    if (!(images as any).hasOwnProperty("main")) {
      images.main = null;
    }
    if (!(images as any).hasOwnProperty("thumbnail")) {
      images.thumbnail = null;
    }
    if (!(images as any).hasOwnProperty("icon")) {
      images.icon = null;
    }*/

    if (this.form.valid) {
      this.save.emit({
        ...this._product,
        ...this.form.value,
        contents: { ...(!!this._product ? this._product.contents : undefined), ...this._state },
        active: !!this._product && this._product.active !== undefined ? this._product.active : true,
        extra: !!this._product ? this._product.extra : {},
      });
    }
  }

  onMainImageUpload(file: File, lang: ILanguage): void {
    this.uploadMainImage.emit({ file, langCode: lang.code });
  }

  onThumbnailImageUpload(file: File, lang: ILanguage): void {
    this.uploadThumbnailImage.emit({ file, langCode: lang.code });
  }

  onIconImageUpload(file: File, lang: ILanguage): void {
    this.uploadIconImage.emit({ file, langCode: lang.code });
  }

  onChangePrices(prices: Array<IPrice>): void {
    this.ctrlPrices.setValue(prices);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getContent(lang: ILanguage): IProductContentsItem {
    return this._product.contents[lang.code];
  }

  updateStateFor(state: IProductContents, lang: ILanguage): void {
    const mergedState: IProductContents = { [lang.code]: { ...this._state[lang.code], ...state } };
    this.updateState(mergedState);
  }

  getAssets(lang: ILanguage): Array<IAsset> {
    return !!this.assets && !!this.assets[lang.code] ? this.assets[lang.code] : undefined;
  }

  private updateState(state: IProductContents): void {
    this._state = { ...this._state, ...state };
  }
}

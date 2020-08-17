import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IProduct, ITag, IAsset, ICurrency, IPrice, IProductImages, ILanguage } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-product-creator-form',
  templateUrl: './product-creator-form.component.html',
  styleUrls: ['./product-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  get color() {
    return this.ctrlColor.value;
  }

  set color(v: string) {
    this.ctrlColor.setValue(v);
  }

  ctrlColor = new FormControl('#000000');

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlTags = new FormControl([]);

  ctrlPrices = new FormControl([]);

  ctrlReceipt = new FormControl([]);

  @Input() images: IProductImages;

  @Input() assets: Array<IAsset>;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  private _product: IProduct;
  @Input() set product(product: IProduct) {
    if (product) {
      this._product = product;

      this.ctrlName.setValue(product.content[this.defaultLanguage.code].name);
      this.ctrlDescription.setValue(product.content[this.defaultLanguage.code].description);
      this.ctrlTags.setValue(product.tags);
      this.ctrlPrices.setValue(product.prices);
      this.ctrlColor.setValue(product.color);
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

  @Output() uploadMainImage = new EventEmitter<File>();

  @Output() uploadThumbnailImage = new EventEmitter<File>();

  @Output() uploadIconImage = new EventEmitter<File>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
      tags: this.ctrlTags,
      prices: this.ctrlPrices,
      receipt: this.ctrlReceipt,
      color: this.ctrlColor,
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
    const images: IProductImages = {...this.images};
    if (!(images as any).hasOwnProperty("main")) {
      images.main = null;
    }
    if (!(images as any).hasOwnProperty("thumbnail")) {
      images.thumbnail = null;
    }
    if (!(images as any).hasOwnProperty("icon")) {
      images.icon = null;
    }

    if (this.form.valid) {
      this.save.emit({
        ...this._product,
        ...this.form.value,
        // images,
        active: !!this._product && this._product.active !== undefined ? this._product.active : true,
        extra: !!this._product ? this._product.extra : {},
      });
    }
  }

  onMainImageUpload(file: File): void {
    this.uploadMainImage.emit(file);
  }

  onThumbnailImageUpload(file: File): void {
    this.uploadThumbnailImage.emit(file);
  }

  onIconImageUpload(file: File): void {
    this.uploadIconImage.emit(file);
  }

  onChangePrices(prices: Array<IPrice>): void {
    this.ctrlPrices.setValue(prices);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

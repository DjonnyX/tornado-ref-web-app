import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IProduct, ITag, IAsset, ICurrency, IPrice, IProductImages } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-product-creator-form',
  templateUrl: './product-creator-form.component.html',
  styleUrls: ['./product-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlTags = new FormControl([]);

  ctrlPrices = new FormControl([]);

  ctrlReceipt = new FormControl([]);

  @Input() images: IProductImages;

  @Input() assets: Array<IAsset>;

  private _product: IProduct;
  @Input() set product(product: IProduct) {
    if (product) {
      this._product = product;

      this.ctrlName.setValue(product.name);
      this.ctrlDescription.setValue(product.description);
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

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
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
        images,
        active: !!this._product && this._product.active !== undefined ? this._product.active : true,
        extra: !!this._product ? this._product.extra : {},
      });
    }
  }

  onMainImageSelect(asset: IAsset): void {
    this.images = {...this.images, main: !!asset ? asset.id : null};
  }

  onThumbnailImageSelect(asset: IAsset): void {
    this.images = {...this.images, thumbnail: !!asset ? asset.id : null};
  }

  onIconImageSelect(asset: IAsset): void {
    this.images = {...this.images, icon: !!asset ? asset.id : null};
  }

  onChangePrices(prices: Array<IPrice>): void {
    this.ctrlPrices.setValue(prices);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

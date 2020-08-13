import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IOrderType, IOrderTypeImages, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-order-type-creator-form',
  templateUrl: './order-type-creator-form.component.html',
  styleUrls: ['./order-type-creator-form.component.scss']
})
export class OrderTypeCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

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

  @Input() images: IOrderTypeImages;

  @Input() assets: Array<IAsset>;

  private _orderType: IOrderType;
  @Input() set orderType(orderType: IOrderType) {
    if (orderType) {
      this._orderType = orderType;

      this.ctrlName.setValue(orderType.name);
      this.ctrlColor.setValue(orderType.color);
      this.ctrlDescription.setValue(orderType.description);
    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<IOrderType>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IOrderType>();

  @Output() uploadMainImage = new EventEmitter<File>();

  @Output() uploadIconImage = new EventEmitter<File>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      color: this.ctrlColor,
      description: this.ctrlDescription,
    })
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onSave(): void {
    if (this.form.valid) {
      const images: IOrderTypeImages = {...this.images};
      if (!(images as any).hasOwnProperty("main")) {
        images.main = null;
      }
      if (!(images as any).hasOwnProperty("icon")) {
        images.icon = null;
      }

      this.save.emit({
        ...this._orderType,
        ...this.form.value,
        images,
        active: !!this._orderType && this._orderType.active !== undefined ? this._orderType.active : true,
        extra: !!this._orderType ? this._orderType.extra : {},
      });
    }
  }

  onMainImageUpload(file: File): void {
    this.uploadMainImage.emit(file);
  }

  onIconImageUpload(file: File): void {
    this.uploadIconImage.emit(file);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

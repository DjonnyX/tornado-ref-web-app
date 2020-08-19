import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IAsset, IProductContentsItem } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';

@Component({
  selector: 'ta-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent extends BaseComponent implements OnInit, OnDestroy {

  get color() {
    return this.ctrlColor.value;
  }

  set color(v: string) {
    this.ctrlColor.setValue(v);
  }

  ctrlColor = new FormControl("#000000");

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _state: IProductContentsItem;

  @Input() isEditMode: boolean;

  @Input() assets: Array<IAsset>;

  private _content: IProductContentsItem;
  @Input() set content(content: IProductContentsItem) {
    if (!content) {
      content = {} as any;
    }

    this._content = content;

    this._state = {...content};

    this.ctrlName.setValue(content.name);
    this.ctrlDescription.setValue(content.description);
    this.ctrlColor.setValue(content.color);

    // this.ctrlReceipt.setValue(product.receipt);
  }

  get content() {
    return this._content;
  }

  @Output() update = new EventEmitter<IProductContentsItem>();

  @Output() uploadMainImage = new EventEmitter<File>();

  @Output() uploadThumbnailImage = new EventEmitter<File>();

  @Output() uploadIconImage = new EventEmitter<File>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.ctrlName.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.updateState({ name: value });
    });
    this.ctrlDescription.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.updateState({ description: value });
    });
    this.ctrlColor.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.updateState({ color: value });
    });

    this.updateState();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
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

  private updateState(options?: any): void {
    if (options) {
      this._state = {
        ...this._state,
        ...options,
      };
    }
    this.update.emit(this._state);
  }
}

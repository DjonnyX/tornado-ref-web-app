import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ISelector, ITag, IAsset, ISelectorImages } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-selector-creator-form',
  templateUrl: './selector-creator-form.component.html',
  styleUrls: ['./selector-creator-form.component.scss']
})
export class SelectorCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

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

  //ctrlTags = new FormControl([]);

  @Input() images: ISelectorImages;

  @Input() assets: Array<IAsset>;

  private _selector: ISelector;
  @Input() set selector(selector: ISelector) {
    if (selector) {
      this._selector = selector;

      this.ctrlName.setValue(selector.name);
      this.ctrlColor.setValue(selector.color);
      this.ctrlDescription.setValue(selector.description);
      //this.ctrlTags.setValue(selector.tags);
    }
  }

  @Input() isEditMode: boolean;

  @Input() tagList: Array<ITag>;

  @Output() save = new EventEmitter<ISelector>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ISelector>();

  @Output() uploadMainImage = new EventEmitter<File>();

  @Output() uploadThumbnailImage = new EventEmitter<File>();

  @Output() uploadIconImage = new EventEmitter<File>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
      color: this.ctrlColor,
      // tags: this.ctrlTags,
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
      const images: ISelectorImages = {...this.images};
      if (!(images as any).hasOwnProperty("main")) {
        images.main = null;
      }
      if (!(images as any).hasOwnProperty("thumbnail")) {
        images.thumbnail = null;
      }
      if (!(images as any).hasOwnProperty("icon")) {
        images.icon = null;
      }

      this.save.emit({
        ...this._selector,
        ...this.form.value,
        images,
        active: !!this._selector && this._selector.active !== undefined ? this._selector.active : true,
        extra: !!this._selector ? this._selector.extra : {},
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

  onCancel(): void {
    this.cancel.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IAsset, ISelectorContentsItem, SelectorImageTypes } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';
import { isEqualWithDefault } from '@app/utils/entity.util';

@Component({
  selector: 'ta-selector-content',
  templateUrl: './selector-content.component.html',
  styleUrls: ['./selector-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorContentComponent extends BaseComponent implements OnInit, OnDestroy {

  get color() {
    return this.ctrlColor.value;
  }

  set color(v: string) {
    this.ctrlColor.setValue(v);
  }

  ctrlColor = new FormControl("#000000");

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _state: ISelectorContentsItem;

  @Input() isEditMode: boolean;

  @Input() isDefault: boolean;

  @Input() defaultContent: ISelectorContentsItem;

  @Input() assets: Array<IAsset>;

  @Input() resourcesGallery: Array<IAsset>;

  private _content: ISelectorContentsItem;
  @Input() set content(content: ISelectorContentsItem) {
    if (!content) {
      content = {} as any;
    }

    this._content = content;

    this._state = { ...content };

    this.ctrlName.setValue(content.name);
    this.ctrlDescription.setValue(content.description);
    this.ctrlColor.setValue(content.color);

    // this.ctrlReceipt.setValue(selector.receipt);
  }

  get content() {
    return this._content;
  }

  @Output() update = new EventEmitter<ISelectorContentsItem>();

  @Output() uploadMainImage = new EventEmitter<IFileUploadEntityEvent>();

  @Output() uploadThumbnailImage = new EventEmitter<IFileUploadEntityEvent>();

  @Output() uploadIconImage = new EventEmitter<IFileUploadEntityEvent>();

  @Output() save = new EventEmitter<void>();

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

  onMainImageUpload(file: File, dataField: string): void {
    this.uploadMainImage.emit({ file, dataField });
  }

  onThumbnailImageUpload(file: File, dataField: string): void {
    this.uploadThumbnailImage.emit({ file, dataField });
  }

  onIconImageUpload(file: File, dataField: string): void {
    this.uploadIconImage.emit({ file, dataField });
  }

  onResetImageToDefault(resourcesType: SelectorImageTypes | string): void {
    this.updateState({
      resources: {
        [resourcesType]: null,
      }
    });

    this.save.emit();
  }

  onResetColorToDefault(): void {
    this.updateState({
      color: this.defaultContent?.color,
    });

    this.save.emit();
  }

  isEqualWithDefault(resourcesType: SelectorImageTypes | string): boolean {
    return !isEqualWithDefault(this.defaultContent, this.content, resourcesType, this.isDefault);
  };

  isColorDefault(): boolean {
    return this.defaultContent?.color === this.color;
  }

  private updateState(options?: any): void {
    if (options) {
      this._state = deepMergeObjects(this._state, options, true);
    }
    this.update.emit(this._state);
  }
}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IAsset, ILanguageContentsItem, LanguageImageTypes } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';
import { isEqualWithDefault } from '@app/utils/entity.util';

@Component({
  selector: 'ta-language-content',
  templateUrl: './language-content.component.html',
  styleUrls: ['./language-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageContentComponent extends BaseComponent implements OnInit, OnDestroy {

  get color() {
    return this.ctrlColor.value;
  }

  set color(v: string) {
    this.ctrlColor.setValue(v);
  }

  ctrlColor = new FormControl("#000000");

  ctrlName = new FormControl('', [Validators.required]);

  private _state: ILanguageContentsItem;

  @Input() isEditMode: boolean;

  @Input() isDefault: boolean;

  @Input() defaultContent: ILanguageContentsItem;

  @Input() assets: Array<IAsset>;

  @Input() imagesGallery: Array<IAsset>;

  private _content: ILanguageContentsItem;
  @Input() set content(content: ILanguageContentsItem) {
    if (!content) {
      content = {} as any;
    }

    this._content = content;

    this._state = { ...content };

    this.ctrlName.setValue(content.name);
    this.ctrlColor.setValue(content.color);

    // this.ctrlReceipt.setValue(ordertype.receipt);
  }

  get content() {
    return this._content;
  }

  @Output() update = new EventEmitter<ILanguageContentsItem>();

  @Output() uploadMainImage = new EventEmitter<IFileUploadEntityEvent>();

  @Output() uploadIconImage = new EventEmitter<IFileUploadEntityEvent>();

  @Output() uploadAsset = new EventEmitter<File>();

  @Output() updateAsset = new EventEmitter<IAsset>();

  @Output() deleteAsset = new EventEmitter<IAsset>();

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

  onResetImageToDefault(imageType: LanguageImageTypes | string): void {
    this.updateState({
      images: {
        [imageType]: null,
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

  isEqualWithDefault(imageType: LanguageImageTypes | string): boolean {
    return !isEqualWithDefault(this.defaultContent, this.content, imageType, this.isDefault);
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

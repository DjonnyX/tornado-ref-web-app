import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IAsset, ISelectorContentsItem, SelectorResourceTypes } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';
import { isEqualWithDefault } from '@app/utils/entity.util';
import { IKeyValue } from '@components/key-value/key-value.component';

interface IData {
  name: IKeyValue;
  description: IKeyValue;
  color: IKeyValue;
}

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

  ctrlColor = new FormControl("#ffffff");

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _state: ISelectorContentsItem;

  @Input() isEditMode: boolean;

  @Input() isEdit: boolean;

  @Input() isDirty: boolean;

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

    this.generateData();

    this.ctrlName.setValue(content.name);
    this.ctrlDescription.setValue(content.description);
    this.ctrlColor.setValue(content.color || '#ffffff');

    // this.ctrlReceipt.setValue(selector.receipt);
  }

  get content() {
    return this._content;
  }

  @Output() update = new EventEmitter<ISelectorContentsItem>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEntityEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEntityEvent>();

  @Output() save = new EventEmitter<void>();

  @Output() confirm = new EventEmitter<Function>();

  private _data: IData;

  get data() {
    return this._data;
  }

  constructor() {
    super();
  }

  private generateData(): void {
    if (!this._state) {
      return;
    }

    this._data = {
      name: {
        key: "Название",
        value: this._state?.name || ' ---',
      },
      description: {
        key: "Описание",
        value: this._state?.description || ' ---',
      },
      color: {
        key: "Цвет",
        value: this._state?.color || ' ---',
      },
    };
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

  onConfirmSave(handler: Function): void {
    this.confirm.emit(handler);
  }

  onMainResourceUpload(file: File, dataField: string): void {
    this.uploadMainResource.emit({ file, dataField });
  }

  onIconResourceUpload(file: File, dataField: string): void {
    this.uploadIconResource.emit({ file, dataField });
  }

  onResetResourceToDefault(resourcesType: SelectorResourceTypes | string): void {
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

  isEqualWithDefault(resourcesType: SelectorResourceTypes | string): boolean {
    return isEqualWithDefault(this.defaultContent, this.content, resourcesType);
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

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IAsset, IOrderTypeContentsItem, OrderTypeResourceTypes } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';
import { isEqualWithDefault } from '@app/utils/entity.util';

@Component({
  selector: 'ta-order-type-content',
  templateUrl: './order-type-content.component.html',
  styleUrls: ['./order-type-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypeContentComponent extends BaseComponent implements OnInit, OnDestroy {

  get color() {
    return this.ctrlColor.value;
  }

  set color(v: string) {
    this.ctrlColor.setValue(v);
  }

  ctrlColor = new FormControl("#000000");

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _state: IOrderTypeContentsItem;

  @Input() isEditMode: boolean;

  @Input() isDefault: boolean;

  @Input() defaultContent: IOrderTypeContentsItem;

  @Input() assets: Array<IAsset>;

  @Input() resourcesGallery: Array<IAsset>;

  private _content: IOrderTypeContentsItem;
  @Input() set content(content: IOrderTypeContentsItem) {
    if (!content) {
      content = {} as any;
    }

    this._content = content;

    this._state = { ...content };

    this.ctrlName.setValue(content.name);
    this.ctrlDescription.setValue(content.description);
    this.ctrlColor.setValue(content.color);

    // this.ctrlReceipt.setValue(ordertype.receipt);
  }

  get content() {
    return this._content;
  }

  @Output() update = new EventEmitter<IOrderTypeContentsItem>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEntityEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEntityEvent>();

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

  onMainResourceUpload(file: File, dataField: string): void {
    this.uploadMainResource.emit({ file, dataField });
  }

  onIconResourceUpload(file: File, dataField: string): void {
    this.uploadIconResource.emit({ file, dataField });
  }

  onResetResourceToDefault(resourcesType: OrderTypeResourceTypes | string): void {
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

  isEqualWithDefault(resourcesType: OrderTypeResourceTypes | string): boolean {
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

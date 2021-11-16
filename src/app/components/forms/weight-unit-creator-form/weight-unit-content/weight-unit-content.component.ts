import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IAsset, IWeightUnitContentsItem } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { deepMergeObjects } from '@app/utils/object.util';
import { IKeyValue } from '@components/key-value/key-value.component';

interface IData {
  name: IKeyValue;
}

@Component({
  selector: 'ta-weight-unit-content',
  templateUrl: './weight-unit-content.component.html',
  styleUrls: ['./weight-unit-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightUnitContentComponent extends BaseComponent implements OnInit, OnDestroy {

  ctrlName = new FormControl('', [Validators.required]);

  private _state: IWeightUnitContentsItem;

  @Input() isEditMode: boolean;

  @Input() isEdit: boolean;

  @Input() isDirty: boolean;

  @Input() isDefault: boolean;

  @Input() defaultContent: IWeightUnitContentsItem;

  @Input() assets: Array<IAsset>;

  @Input() resourcesGallery: Array<IAsset>;

  private _content: IWeightUnitContentsItem;
  @Input() set content(content: IWeightUnitContentsItem) {
    if (!content) {
      content = {} as any;
    }

    this._content = content;

    this._state = { ...content };

    this.generateData();

    this.ctrlName.setValue(content.name);
  }

  get content() {
    return this._content;
  }

  @Output() update = new EventEmitter<IWeightUnitContentsItem>();

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
    };
  }

  ngOnInit(): void {
    this.ctrlName.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.updateState({ name: value });
    });

    this.updateState();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onConfirmSave(handler: Function): void {
    this.confirm.emit(handler);
  }

  private updateState(options?: any): void {
    if (options) {
      this._state = deepMergeObjects(this._state, options, true);
    }
    this.update.emit(this._state);
  }
}

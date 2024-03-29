import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IBusinessPeriodContentsItem } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { deepMergeObjects } from '@app/utils/object.util';
import { IKeyValue } from '@components/key-value/key-value.component';

interface IData {
  name: IKeyValue;
  description: IKeyValue;
}

@Component({
  selector: 'ta-business-period-content',
  templateUrl: './business-period-content.component.html',
  styleUrls: ['./business-period-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessPeriodContentComponent extends BaseComponent implements OnInit, OnDestroy {

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _state: IBusinessPeriodContentsItem;

  @Input() isEditMode: boolean;

  @Input() isEdit: boolean;

  @Input() isDefault: boolean;

  @Input() defaultContent: IBusinessPeriodContentsItem;

  private _content: IBusinessPeriodContentsItem;
  @Input() set content(content: IBusinessPeriodContentsItem) {
    if (!content) {
      content = {} as any;
    }

    this._content = content;

    this._state = { ...content };

    this.generateData();

    this.ctrlName.setValue(content.name);
    this.ctrlDescription.setValue(content.description);
  }

  get content() {
    return this._content;
  }

  @Output() update = new EventEmitter<IBusinessPeriodContentsItem>();

  @Output() save = new EventEmitter<void>();

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

    this.updateState();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  private updateState(options?: any): void {
    if (options) {
      this._state = deepMergeObjects(this._state, options, true);
    }
    this.update.emit(this._state);
  }
}

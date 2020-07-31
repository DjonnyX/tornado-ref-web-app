import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IScenario, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes, IBusinessPeriod } from '@djonnyx/tornado-types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { getScenarioTypeName } from '@app/utils/scenario.util';

const SCENARIO_EDITOR_TYPES = [
  ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
  ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE,
  ScenarioIntroActionTypes.DURATION,
  ScenarioProductActionTypes.DOWN_LIMIT,
  ScenarioProductActionTypes.UP_LIMIT,
  ScenarioSelectorActionTypes.MAX_USAGE,
  ScenarioSelectorActionTypes.DEFAULT_PRODUCTS,
];

@Component({
  selector: 'ta-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent extends BaseComponent implements OnInit {

  @Input() set scenario(v: IScenario) {
    if (v) {
      this.ctrlAction.setValue(v.action);
      this.ctrlValue.setValue(v.value);
      this.ctrlExtra.setValue(v.extra);

      this.resetValidators(v.action);
    }
  }

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Output() edit = new EventEmitter<IScenario>();

  @Output() status = new EventEmitter<string>();

  form: FormGroup;

  ctrlAction = new FormControl(undefined, [Validators.required]);

  ctrlValue = new FormControl(undefined);

  ctrlExtra = new FormControl(undefined);

  readonly types = SCENARIO_EDITOR_TYPES;

  readonly ScenarioCommonActionTypes = ScenarioCommonActionTypes;

  readonly ScenarioIntroActionTypes = ScenarioIntroActionTypes;

  readonly ScenarioProductActionTypes = ScenarioProductActionTypes;

  readonly ScenarioSelectorActionTypes = ScenarioSelectorActionTypes;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      action: this.ctrlAction,
      value: this.ctrlValue,
      extra: this.ctrlExtra,
    });

    this.ctrlAction.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(action => {
      this.resetValidators(action);
      this.ctrlValue.setValue(null);
    });

    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.edit.emit(value);
    });

    this.form.statusChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(status => {
      this.status.emit(status);
    });
  }

  getTypeName(type: ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes): string {
    return getScenarioTypeName(type);
  }

  private resetValidators(action: ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes): void {
    this.ctrlValue.clearValidators();

    switch (action) {
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
      case ScenarioIntroActionTypes.DURATION:
      case ScenarioProductActionTypes.DOWN_LIMIT:
      case ScenarioProductActionTypes.UP_LIMIT:
      case ScenarioSelectorActionTypes.MAX_USAGE:
      case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
        this.ctrlValue.setValidators([Validators.required]);
        break;
    }
  }
}

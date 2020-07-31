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

  @Input() set scenario (v: IScenario) {
    if (v) {
      this.ctrlAction.setValue(v.action);
      this.ctrlValue.setValue(v.value);
      this.ctrlExtra.setValue(v.extra);
    }
  }

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Output() edit = new EventEmitter<IScenario>();

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
    ).subscribe(value => {
      this.ctrlValue.setValue(null);
    });

    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.edit.emit(value);
    });
  }

  getTypeName(type: ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes): string {
    return getScenarioTypeName(type);
  }
}

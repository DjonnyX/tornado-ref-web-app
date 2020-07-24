import { Component, OnInit, Input } from '@angular/core';
import { IScenario, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes } from '@djonnyx/tornado-types';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
export class ScenarioEditorComponent implements OnInit {

  @Input() scenario: IScenario;

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlType = new FormControl(undefined);

  ctrlValue = new FormControl(undefined);

  readonly types = SCENARIO_EDITOR_TYPES;

  readonly ScenarioCommonActionTypes = ScenarioCommonActionTypes;

  readonly ScenarioIntroActionTypes = ScenarioIntroActionTypes;

  readonly ScenarioProductActionTypes = ScenarioProductActionTypes;

  readonly ScenarioSelectorActionTypes = ScenarioSelectorActionTypes;

  constructor() { }

  ngOnInit(): void {
    /*this.ctrlValue.valueChanges.subscribe(v => {
      switch (v) {
        case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
        case ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE:
        case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
          this.type = ScenarioEditorTypes.MULTIPLE_FROM_REF;
          break;
        case ScenarioIntroActionTypes.DURATION:
        case ScenarioProductActionTypes.UP_LIMIT:
        case ScenarioProductActionTypes.DOWN_LIMIT:
        case ScenarioSelectorActionTypes.MAX_USAGE:
          this.type = ScenarioEditorTypes.SIMPLE_NUMBER;
          break;
      }
    });*/
  }

  onSave(): void { }

  getTypeName(type: ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes): string {
    switch (type) {
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
        return "Visible by business periods";
      case ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE:
        return "Visible by points of sale";
      case ScenarioIntroActionTypes.DURATION:
        return "Intro duration";
      case ScenarioProductActionTypes.DOWN_LIMIT:
        return "Down limit";
      case ScenarioProductActionTypes.UP_LIMIT:
        return "Up limit";
      case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
        return "Default products";
      case ScenarioSelectorActionTypes.MAX_USAGE:
        return "Max usage";
    }
  }
}

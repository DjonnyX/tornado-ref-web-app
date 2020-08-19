import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IScenario, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes, IBusinessPeriod, ICurrency } from '@djonnyx/tornado-types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { getScenarioTypeName } from '@app/utils/scenario.util';
import { NodeScenarioTypes } from '@enums/node-scenario-types';

@Component({
  selector: 'ta-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent extends BaseComponent implements OnInit {

  @Input() currencies: Array<ICurrency>;

  private _scenario: IScenario;

  @Input() set scenario(v: IScenario) {
    if (v) {
      this._scenario = v;
      this.ctrlAction.setValue(v.action);
      this.ctrlExtra.setValue(v.extra);

      switch (v.action) {
        case ScenarioProductActionTypes.ADDITIONAL_PRICE:
        case ScenarioProductActionTypes.FIXED_PRICE:
          this.ctrlValue.setValue(!!v.value ? v.value.value * 0.01 : 0);
          this.ctrlCurrency.setValue(!!v.value ? v.value.currency : undefined);
          break;
        default:
          this.ctrlValue.setValue(v.value);
          break;
      }

      this.resetValidators(v.action);
    }
  }

  @Input() set type(v: NodeScenarioTypes) {
    switch (v) {
      case NodeScenarioTypes.CATEGORY:
        this.types = [
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE,
          ScenarioSelectorActionTypes.MAX_USAGE,
          ScenarioSelectorActionTypes.DEFAULT_PRODUCTS,
        ];
        break;
      case NodeScenarioTypes.PRODUCT:
        this.types = [
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE,
          ScenarioProductActionTypes.UP_LIMIT,
          ScenarioProductActionTypes.ADDITIONAL_PRICE,
          ScenarioProductActionTypes.FIXED_PRICE,
        ];
        break;
      case NodeScenarioTypes.PRODUCT_IN_SCHEMA:
        this.types = [
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE,
          ScenarioProductActionTypes.UP_LIMIT,
          ScenarioProductActionTypes.DOWN_LIMIT,
          ScenarioProductActionTypes.ADDITIONAL_PRICE,
          ScenarioProductActionTypes.FIXED_PRICE,
        ];
        break;
      case NodeScenarioTypes.CATEGORY_IN_SCHEMA:
        this.types = [
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE,
          ScenarioSelectorActionTypes.MAX_USAGE,
          ScenarioSelectorActionTypes.DEFAULT_PRODUCTS,
        ];
        break;
    }
  }

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Output() edit = new EventEmitter<IScenario>();

  @Output() status = new EventEmitter<string>();

  form: FormGroup;

  ctrlAction = new FormControl(undefined, [Validators.required]);

  ctrlValue = new FormControl(undefined);

  ctrlExtra = new FormControl(undefined);

  ctrlCurrency = new FormControl(undefined, [Validators.required]);

  types: Array<ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes>;

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
      currency: this.ctrlCurrency,
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
      const scenario: IScenario = {
        active: !!this._scenario ? this._scenario.active : true,
        action: value.action,
        extra: value.extra,
      };

      switch (value.action) {
        case ScenarioProductActionTypes.ADDITIONAL_PRICE:
        case ScenarioProductActionTypes.FIXED_PRICE:
          scenario.value = {
            currency: value.currency,
            value: value.value * 100,
          };
          break;
        case ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE:
        case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
          scenario.value = null;
          break;
        default:
          scenario.value = value.value;
          break;
      }

      this.edit.emit(scenario);
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
    this.ctrlCurrency.clearValidators();
    this.ctrlValue.clearValidators();

    switch (action) {
      case ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE:
      case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
        this.ctrlValue.setValue("");
        this.ctrlCurrency.setValue("");
        break;
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
      case ScenarioIntroActionTypes.DURATION:
      case ScenarioProductActionTypes.DOWN_LIMIT:
      case ScenarioProductActionTypes.UP_LIMIT:
      case ScenarioSelectorActionTypes.MAX_USAGE:
      case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
        this.ctrlValue.setValidators([Validators.required]);
        this.ctrlCurrency.setValue("");
        break;
      case ScenarioProductActionTypes.ADDITIONAL_PRICE:
      case ScenarioProductActionTypes.FIXED_PRICE:
        this.ctrlValue.setValidators([Validators.required]);
        this.ctrlCurrency.setValidators([Validators.required]);
        break;
    }
  }
}

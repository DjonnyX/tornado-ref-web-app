import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  IScenario, IStore, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes,
  ScenarioSelectorActionTypes, IBusinessPeriod, ICurrency, ScenarioProgrammActionTypes, ILanguage,
  IScenarioPriceValue, IOrderType, ISelector, IProduct, ScenarioPriceActionTypes
} from '@djonnyx/tornado-types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { getScenarioTypeName } from '@app/utils/scenario.util';
import { NodeScenarioTypes } from '@enums/node-scenario-types';
import { getMapOfCollection, ICollectionDictionary } from '@app/utils/collection.util';

@Component({
  selector: 'ta-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent extends BaseComponent implements OnInit {

  @Input() currencies: Array<ICurrency>;

  @Input() languages: Array<ILanguage>;

  @Input() defaultLanguage: ILanguage;

  private _scenarios: Array<IScenario>;
  private scenariosDictionary: ICollectionDictionary<IScenario>;

  @Input() set scenarios(v: Array<IScenario>) {
    if (v) {
      this._scenarios = v;
      this.scenariosDictionary = !!v ? getMapOfCollection(v, "action") : {};
    }
  }

  get actualTypes(): Array<string> {
    return !!this.scenariosDictionary && !!this.types
      ? this.types.filter(t => t === this._scenario?.action || !this.scenariosDictionary[t])
      : [];
  }

  private _scenario: IScenario;

  @Input() set scenario(v: IScenario) {
    if (v) {
      this._scenario = v;
      this.ctrlAction.setValue(v.action);
      this.ctrlExtra.setValue(v.extra);

      switch (v.action) {
        case ScenarioPriceActionTypes.PRICE:
        case ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD:
        case ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE:
          const priceValue = v.value as IScenarioPriceValue;
          if (priceValue.isPersentage) {
            this.ctrlValue.setValue(!!v.value ? (v.value as IScenarioPriceValue).value : 0);
          } else {
            this.ctrlValue.setValue(!!v.value ? (v.value as IScenarioPriceValue).value * 0.01 : 0);
          }
          this.ctrlCurrency.setValue(!!v.value ? (v.value as IScenarioPriceValue).currency : undefined);
          this.ctrlIsPercentage.setValue(!!v.value ? (v.value as IScenarioPriceValue).isPersentage : false);
          this.ctrlIsStatic.setValue(!!v.value ? (v.value as IScenarioPriceValue).isStatic : false);
          if (v.action === ScenarioPriceActionTypes.PRICE) {
            this.ctrlEntities.setValue(undefined);
          } else
            if (v.action === ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD
              || v.action === ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE) {
              this.ctrlEntities.setValue((v.value as IScenarioPriceValue).entities);
            }
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
          // ScenarioProgrammActionTypes.SWITCH,
          // ScenarioProgrammActionTypes.EXPRESSION,
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE,
          ScenarioCommonActionTypes.VISIBLE_BY_STORE,
          // ScenarioSelectorActionTypes.MAX_USAGE,
          // ScenarioSelectorActionTypes.MIN_USAGE,
          // ScenarioSelectorActionTypes.DEFAULT_PRODUCTS,
        ];
        break;
      case NodeScenarioTypes.PRODUCT:
        this.types = [
          // ScenarioProgrammActionTypes.SWITCH,
          // ScenarioProgrammActionTypes.EXPRESSION,
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE,
          ScenarioCommonActionTypes.VISIBLE_BY_STORE,
          // ScenarioProductActionTypes.UP_LIMIT,
          ScenarioPriceActionTypes.PRICE,
          ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE,
          ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD,
        ];
        break;
      case NodeScenarioTypes.PRODUCT_IN_SCHEMA:
        this.types = [
          // ScenarioProgrammActionTypes.SWITCH,
          // ScenarioProgrammActionTypes.EXPRESSION,
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE,
          ScenarioCommonActionTypes.VISIBLE_BY_STORE,
          ScenarioProductActionTypes.UP_LIMIT,
          ScenarioProductActionTypes.DOWN_LIMIT,
          ScenarioPriceActionTypes.PRICE,
          ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE,
          ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD,
        ];
        break;
      case NodeScenarioTypes.CHECKUE:
        this.types = [
          ScenarioPriceActionTypes.PRICE,
          ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE,
          ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD,
        ];
        break;
      case NodeScenarioTypes.CATEGORY_IN_SCHEMA:
        this.types = [
          // ScenarioProgrammActionTypes.SWITCH,
          // ScenarioProgrammActionTypes.EXPRESSION,
          ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
          ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE,
          // ScenarioCommonActionTypes.VISIBLE_BY_TERMINAL,
          ScenarioCommonActionTypes.VISIBLE_BY_STORE,
          ScenarioSelectorActionTypes.MAX_USAGE,
          ScenarioSelectorActionTypes.MIN_USAGE,
          // ScenarioSelectorActionTypes.DEFAULT_PRODUCTS,
        ];
        break;
    }
  }

  @Input() languagesDictionary: ICollectionDictionary<ILanguage>;

  @Input() orderTypes: Array<IOrderType>;

  @Input() orderTypesDictionary: ICollectionDictionary<IOrderType>;

  @Input() currenciesDictionary: ICollectionDictionary<ICurrency>;

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Input() businessPeriodsDictionary: ICollectionDictionary<IBusinessPeriod>;

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: ICollectionDictionary<ISelector>;

  @Input() products: Array<IProduct>;

  @Input() productsDictionary: ICollectionDictionary<IProduct>;

  @Input() stores: Array<IStore>;

  @Input() storesDictionary: ICollectionDictionary<IStore>;

  @Output() edit = new EventEmitter<IScenario>();

  @Output() status = new EventEmitter<string>();

  form: FormGroup;

  ctrlAction = new FormControl(undefined, [Validators.required]);

  ctrlValue = new FormControl(undefined);

  ctrlIsStatic = new FormControl(undefined);

  ctrlIsPercentage = new FormControl(undefined);

  ctrlEntities = new FormControl([]);

  ctrlExtra = new FormControl(undefined);

  ctrlCurrency = new FormControl(undefined, [Validators.required]);

  types: Array<ScenarioProgrammActionTypes | ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes
    | ScenarioSelectorActionTypes | ScenarioPriceActionTypes>;

  readonly ScenarioCommonActionTypes = ScenarioCommonActionTypes;

  readonly ScenarioIntroActionTypes = ScenarioIntroActionTypes;

  readonly ScenarioProductActionTypes = ScenarioProductActionTypes;

  readonly ScenarioSelectorActionTypes = ScenarioSelectorActionTypes;

  readonly ScenarioProgrammActionTypes = ScenarioProgrammActionTypes;

  readonly ScenarioPriceActionTypes = ScenarioPriceActionTypes;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      action: this.ctrlAction,
      value: this.ctrlValue,
      currency: this.ctrlCurrency,
      isStatic: this.ctrlIsStatic,
      isPersentage: this.ctrlIsPercentage,
      entities: this.ctrlEntities,
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
        case ScenarioPriceActionTypes.PRICE:
          const priceValue = value as IScenarioPriceValue;
          if (priceValue.isPersentage) {
            (scenario.value as IScenarioPriceValue) = {
              currency: value.currency,
              value: value.value,
              isStatic: Boolean(value.isStatic),
              isPersentage: Boolean(value.isPersentage),
            };
          } else {
            (scenario.value as IScenarioPriceValue) = {
              currency: value.currency,
              value: value.value * 100,
              isStatic: Boolean(value.isStatic),
              isPersentage: Boolean(value.isPersentage),
            };
          }
          break;
        case ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE:
        case ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD:
          const priceValue1 = value as IScenarioPriceValue;
          if (priceValue1.isPersentage) {
            (scenario.value as IScenarioPriceValue) = {
              currency: value.currency,
              value: value.value,
              isStatic: Boolean(value.isStatic),
              isPersentage: Boolean(value.isPersentage),
              entities: value.entities,
            };
          } else {
            (scenario.value as IScenarioPriceValue) = {
              currency: value.currency,
              value: value.value * 100,
              isStatic: Boolean(value.isStatic),
              isPersentage: Boolean(value.isPersentage),
              entities: value.entities,
            };
          }
          break;
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

  getTypeName(type: ScenarioProgrammActionTypes | ScenarioCommonActionTypes | ScenarioIntroActionTypes |
    ScenarioProductActionTypes | ScenarioSelectorActionTypes): string {
    return getScenarioTypeName(type);
  }

  getBusinessPeriodName(bp: IBusinessPeriod) {
    return bp.contents[this.defaultLanguage?.code]?.name;
  }

  getOrderTypeName(ot: IOrderType) {
    return ot.contents[this.defaultLanguage?.code]?.name;
  }

  getStoreName(store: IStore) {
    return store.name;
  }

  private resetValidators(action: ScenarioProgrammActionTypes | ScenarioCommonActionTypes | ScenarioIntroActionTypes |
    ScenarioProductActionTypes | ScenarioSelectorActionTypes | ScenarioPriceActionTypes): void {
    this.ctrlCurrency.clearValidators();
    this.ctrlValue.clearValidators();
    this.ctrlIsStatic.clearValidators();
    this.ctrlIsPercentage.clearValidators();
    this.ctrlEntities.clearValidators();

    switch (action) {
      case ScenarioProgrammActionTypes.SWITCH:

        break;
      case ScenarioProgrammActionTypes.EXPRESSION:

        break;
      case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
        this.ctrlValue.setValue("");
        this.ctrlCurrency.setValue("");
        break;
      case ScenarioCommonActionTypes.VISIBLE_BY_STORE:
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
      case ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE:
      case ScenarioIntroActionTypes.DURATION:
      case ScenarioProductActionTypes.DOWN_LIMIT:
      case ScenarioProductActionTypes.UP_LIMIT:
      case ScenarioSelectorActionTypes.MAX_USAGE:
      case ScenarioSelectorActionTypes.MIN_USAGE:
      case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
        this.ctrlValue.setValidators([Validators.required]);
        this.ctrlCurrency.setValue("");
        break;
      case ScenarioPriceActionTypes.PRICE:
      case ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD:
      case ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE:
        this.ctrlValue.setValidators([Validators.required]);
        this.ctrlCurrency.setValue(this.currencies.find(c => c.isDefault).id);
        this.ctrlEntities.setValidators([Validators.required]);
        if (action === ScenarioPriceActionTypes.PRICE) {
          this.ctrlEntities.setValue(undefined);
        } else
          if (action === ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD
            || action === ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE) {
            this.ctrlEntities.setValue([]);
          }
        break;
    }
  }
}

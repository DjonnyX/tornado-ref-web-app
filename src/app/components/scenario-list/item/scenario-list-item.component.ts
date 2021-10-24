import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {
  IScenario, IStore, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes,
  ScenarioSelectorActionTypes, IBusinessPeriod, ICurrency, ILanguage, IScenarioPriceValue, ScenarioPriceActionTypes, IOrderType
} from '@djonnyx/tornado-types';
import { getScenarioTypeName } from '@app/utils/scenario.util';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-scenario-list-item',
  templateUrl: './scenario-list-item.component.html',
  styleUrls: ['./scenario-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScenarioListItemComponent implements OnInit {

  @Input() scenario: IScenario;

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Input() languages: Array<ILanguage>;

  @Input() defaultLanguage: ILanguage;

  @Input() businessPeriodsDictionary: { [id: string]: IBusinessPeriod };

  @Input() currencies: Array<ICurrency>;

  @Input() currenciesDictionary: { [id: string]: ICurrency };

  @Input() stores: Array<IStore>;

  @Input() storesDictionary: { [id: string]: IStore };

  @Input() orderTypes: Array<IOrderType>;

  @Input() orderTypesDictionary: { [id: string]: IOrderType };

  @Input() isFirstInCollection: boolean;

  @Input() isLastInCollection: boolean;

  @Input() lock: boolean;

  @Output() upward = new EventEmitter<void>();

  @Output() downward = new EventEmitter<void>();

  @Output() edit = new EventEmitter<any>();

  @Output() update = new EventEmitter<any>();

  @Output() delete = new EventEmitter<void>();

  constructor(
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void { }

  getTitle(): string {
    const actionName = getScenarioTypeName(this.scenario.action);
    let value = '';

    switch (this.scenario.action) {
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
        value = `#{: }${(this.scenario.value as Array<string>).map(v => !!this.businessPeriodsDictionary?.[v] ? `#{${this.businessPeriodsDictionary?.[v]?.contents[this.defaultLanguage?.code]?.name}}` : "common_info-unavailable").join("#{, }")}`;
        break;
      case ScenarioCommonActionTypes.VISIBLE_BY_STORE:
        value = `#{: }${(this.scenario.value as Array<string>).map(v => !!this.storesDictionary?.[v] ? `#{${this.storesDictionary?.[v]?.name}}` : "common_info-unavailable").join("#{, }")}`;
        break;
      case ScenarioCommonActionTypes.VISIBLE_BY_TERMINAL:
        // value = `#{: }${(this.scenario.value as Array<string>).map(v => !!this.storesDictionary[v] ? `#{${this.storesDictionary?.[v]?.name}}` : "common_info-unavailable").join("#{, }")}`;
        break;
      case ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE:
        value = `#{: }${(this.scenario.value as Array<string>).map(v => !!this.orderTypesDictionary?.[v] ? `#{${this.orderTypesDictionary?.[v]?.contents[this.defaultLanguage?.code]?.name}}` : "common_info-unavailable").join("#{, }")}`;
        break;
      case ScenarioPriceActionTypes.PRICE:
        return this.getScenarioPriceName(this.scenario);
      case ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD:
        return `${this.getScenarioPriceName(this.scenario)}#{ }(${((this.scenario.value as IScenarioPriceValue).entities).map(v => !!this.businessPeriodsDictionary?.[v] ? `#{${this.businessPeriodsDictionary?.[v]?.contents[this.defaultLanguage?.code]?.name}}` : "common_info-unavailable").join("#{, }")
          })`;
      case ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE:
        return `${this.getScenarioPriceName(this.scenario)}#{ }(${((this.scenario.value as IScenarioPriceValue).entities).map(v => !!this.orderTypesDictionary?.[v] ? `#{${this.orderTypesDictionary?.[v]?.contents[this.defaultLanguage?.code]?.name}}` : "common_info-unavailable").join("#{, }")
          })`;
      case ScenarioProductActionTypes.UP_LIMIT:
      case ScenarioProductActionTypes.DOWN_LIMIT:
      case ScenarioSelectorActionTypes.MAX_USAGE:
      case ScenarioSelectorActionTypes.MIN_USAGE:
        value = `#{: ${this.scenario.value} }common_info-pcs`;
        break;
      case ScenarioIntroActionTypes.DURATION:
        value = `#{: ${this.scenario.value}}`;
        break;
    }

    return `${actionName} ${value}`;
  }

  private getScenarioPriceName(scenario: IScenario): string {
    let value: string;
    const priceValue = scenario.value as IScenarioPriceValue;
    if (priceValue.isPersentage) {
      value = `: ${(scenario.value as IScenarioPriceValue).value}%`;
      if ((scenario.value as IScenarioPriceValue).value > 0) {
        return `scenario_extra-charge#{${value}}`;
      } else if ((scenario.value as IScenarioPriceValue).value < 0) {
        return `scenario_discount#{${value}}`;
      } else {
        return `scenario_without-discount`;
      }
    } else if (priceValue.isStatic) {
      value = `: ${((scenario.value as IScenarioPriceValue).value * 0.01).toFixed(2)} ${this.currenciesDictionary?.[(scenario.value as IScenarioPriceValue).currency] ? this.currenciesDictionary[(scenario.value as IScenarioPriceValue).currency].symbol : ""}`;
      if ((scenario.value as IScenarioPriceValue).value <= 0) {
        return `scenario_free`;
      }
      return `scenario_price#{${value}}`;
    } else {
      value = `: ${(scenario.value as IScenarioPriceValue).value >= 0 ? '+' : ''}${((scenario.value as IScenarioPriceValue).value * 0.01).toFixed(2)} ${this.currenciesDictionary[(scenario.value as IScenarioPriceValue).currency] ? this.currenciesDictionary[(scenario.value as IScenarioPriceValue).currency].symbol : ""}`;
      if ((scenario.value as IScenarioPriceValue).value > 0) {
        return `scenario_extra-charge#{${value}}`;
      } else if ((scenario.value as IScenarioPriceValue).value < 0) {
        return `scenario_discount#{${value}}`;
      } else {
        return `scenario_without-discount`;
      }
    }
  }

  onToggleActive(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({
      ...this.scenario,
      active: !this.scenario.active,
    });
  }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onEdit(event?: Event): void {
    if (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    if (this.lock || this.scenario?.lock) {
      return;
    }

    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }

  onUpward(): void {
    this.upward.emit();
  }

  onDownward(): void {
    this.downward.emit();
  }
}

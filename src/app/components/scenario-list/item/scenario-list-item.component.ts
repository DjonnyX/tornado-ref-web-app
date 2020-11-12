import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { IScenario, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes, IBusinessPeriod, ICurrency, ILanguage, IScenarioPriceValue } from '@djonnyx/tornado-types';
import { getScenarioTypeName } from '@app/utils/scenario.util';

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

  @Input() isFirstInCollection: boolean;

  @Input() isLastInCollection: boolean;

  @Input() lock: boolean;

  @Output() upward = new EventEmitter<void>();

  @Output() downward = new EventEmitter<void>();

  @Output() edit = new EventEmitter<any>();

  @Output() update = new EventEmitter<any>();

  @Output() delete = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  getTitle(): string {
    const actionName = getScenarioTypeName(this.scenario.action);
    let value = '';

    switch (this.scenario.action) {
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
        value = `: ${(this.scenario.value as Array<string>).map(v => this.businessPeriodsDictionary[v] ? this.businessPeriodsDictionary[v]?.contents[this.defaultLanguage?.code]?.name : "недоступен").join(", ")}`;
        break;
      case ScenarioProductActionTypes.ADDITIONAL_PRICE:
      case ScenarioProductActionTypes.FIXED_PRICE:
        value = `: ${((this.scenario.value as IScenarioPriceValue).value * 0.01).toFixed(2)} ${this.currenciesDictionary[(this.scenario.value as IScenarioPriceValue).currency] ? this.currenciesDictionary[(this.scenario.value as IScenarioPriceValue).currency].name : ""}`;
        break;
      case ScenarioProductActionTypes.UP_LIMIT:
      case ScenarioProductActionTypes.DOWN_LIMIT:
      case ScenarioSelectorActionTypes.MAX_USAGE:
        value = `: ${this.scenario.value} шт`;
        break;
      case ScenarioIntroActionTypes.DURATION:
        value = `: ${this.scenario.value}`;
        break;
    }

    return `${actionName}${value}`;
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

    if (this.lock) {
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

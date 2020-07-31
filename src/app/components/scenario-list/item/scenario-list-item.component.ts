import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IScenario, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes, IBusinessPeriod } from '@djonnyx/tornado-types';
import { getScenarioTypeName } from '@app/utils/scenario.util';

@Component({
  selector: 'ta-scenario-list-item',
  templateUrl: './scenario-list-item.component.html',
  styleUrls: ['./scenario-list-item.component.scss']
})
export class ScenarioListItemComponent implements OnInit {

  @Input() scenario: IScenario;

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Input() businessPeriodsDictionary: { [id: string]: IBusinessPeriod };

  @Input() isFirstInCollection: boolean;

  @Input() isLastInCollection: boolean;

  @Input() lock: boolean;

  @Output() upward = new EventEmitter<void>();

  @Output() downward = new EventEmitter<void>();

  @Output() edit = new EventEmitter<void>();

  @Output() delete = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  getTitle(): string {
    const actionName = getScenarioTypeName(this.scenario.action);
    let value = '';

    switch (this.scenario.action) {
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
        value = `: ${this.scenario.value.map(v => this.businessPeriodsDictionary[v] ? this.businessPeriodsDictionary[v].name : "missing").join(", ")}`;
        break;
      case ScenarioIntroActionTypes.DURATION:
      case ScenarioProductActionTypes.UP_LIMIT:
      case ScenarioProductActionTypes.DOWN_LIMIT:
      case ScenarioSelectorActionTypes.MAX_USAGE:
        value = `: ${this.scenario.value}`;
        break;
    }

    return `${actionName}${value}`;
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

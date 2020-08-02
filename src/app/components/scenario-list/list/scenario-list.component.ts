import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types/dist/interfaces/raw/IScenario';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScenarioListComponent implements OnInit {

  @Input() scenarios: Array<IScenario>;

  @Input() businessPeriods: Array<IBusinessPeriod>;
  
  @Input() businessPeriodsDictionary: {[id: string]: IBusinessPeriod};
  
  @Input() lock: boolean;
  
  @Input() disabled: boolean;

  @Output() deleteAll = new EventEmitter<void>();

  @Output() upward = new EventEmitter<IScenario>();

  @Output() downward = new EventEmitter<IScenario>();

  @Output() edit = new EventEmitter<IScenario>();

  @Output() update = new EventEmitter<Array<IScenario>>();

  @Output() delete = new EventEmitter<IScenario>();

  @Output() add = new EventEmitter<void>();

  isExpanded = false;

  constructor() { }

  ngOnInit(): void { }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onDeleteAll(): void {
    this.deleteAll.emit();
  }

  onDelete(scenario: IScenario): void {
    this.delete.emit(scenario);
  }

  onAdd(): void {
    this.add.emit();
  }

  onEdit(scenario: IScenario): void {
    this.edit.emit(scenario);
  }

  onUpdate(scenario: IScenario, originalScenario: IScenario): void {
    const index = this.scenarios.indexOf(originalScenario);
    const result = [...this.scenarios];
    if (index > -1) {
      result[index] = scenario;
    }

    this.update.emit(result);
  }

  onUpward(scenario: IScenario): void {
    this.upward.emit(scenario);
  }

  onDownward(scenario: IScenario): void {
    this.downward.emit(scenario);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types/dist/interfaces/raw/IScenario';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {

  @Input() scenarios: Array<IScenario>;

  @Input() businessPeriods: Array<IBusinessPeriod>;
  
  @Input() businessPeriodsDictionary: {[id: string]: IBusinessPeriod};

  @Output() deleteAll = new EventEmitter<void>();

  @Output() upward = new EventEmitter<IScenario>();

  @Output() downward = new EventEmitter<IScenario>();

  @Output() edit = new EventEmitter<IScenario>();

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

  onUpward(scenario: IScenario): void {
    this.upward.emit(scenario);
  }

  onDownward(scenario: IScenario): void {
    this.downward.emit(scenario);
  }
}

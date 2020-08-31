import { Component, OnInit, Inject } from '@angular/core';
import { IScenario, IBusinessPeriod, ICurrency, ILanguage } from '@djonnyx/tornado-types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeScenarioTypes } from '@enums/node-scenario-types';

interface IDialogData {
  type: NodeScenarioTypes;
  title: string;
  message: string;
  scenario: IScenario;
  businessPeriods: Array<IBusinessPeriod>;
  currencies: Array<ICurrency>;
  languages: Array<ILanguage>;
  defaultLanguage: ILanguage;
}

@Component({
  selector: 'ta-edit-scenario-dialog',
  templateUrl: './edit-scenario-dialog.component.html',
  styleUrls: ['./edit-scenario-dialog.component.scss']
})
export class EditScenarioDialogComponent implements OnInit {

  content: IScenario;

  replacedScenario: IScenario;

  status = "INVALID";

  get result() {
    return {
      content: this.content,
      replacedScenario: this.replacedScenario,
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void { }

  onChangeScenario(scenario: IScenario): void {
    if (this.data.scenario) {
      this.replacedScenario = this.data.scenario;
      this.content = scenario;
    } else {
      this.content = scenario;
    }
  }

  onChangeStatus(status: string): void {
    this.status = status;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { IScenario, IBusinessPeriod } from '@djonnyx/tornado-types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IDialogData {
  title: string;
  message: string;
  scenario: IScenario;
  businessPeriods: Array<IBusinessPeriod>;
}

@Component({
  selector: 'ta-edit-scenario-dialog',
  templateUrl: './edit-scenario-dialog.component.html',
  styleUrls: ['./edit-scenario-dialog.component.scss']
})
export class EditScenarioDialogComponent implements OnInit {

  content: IScenario;

  replacedScenario: IScenario;

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
}

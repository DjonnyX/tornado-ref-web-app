import { Component, OnInit, Inject } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IDialogData {
  title: string;
  message: string;
  scenario: IScenario;
}

@Component({
  selector: 'ta-edit-scenario-dialog',
  templateUrl: './edit-scenario-dialog.component.html',
  styleUrls: ['./edit-scenario-dialog.component.scss']
})
export class EditScenarioDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {
  }

}

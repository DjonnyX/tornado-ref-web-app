import { Component, OnInit, Input } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent implements OnInit {

  @Input() scenario: IScenario;

  constructor() { }

  ngOnInit(): void {
  }

}

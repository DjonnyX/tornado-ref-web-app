import { Component, OnInit, Input } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types/dist/interfaces/raw/IScenario';

@Component({
  selector: 'ta-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent implements OnInit {

  @Input() scenarios: Array<IScenario>;

  @Input() newScenario: IScenario;

  constructor() { }

  ngOnInit(): void {
  }

  onCreateScenario(): void {

  }
}

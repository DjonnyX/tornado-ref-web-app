import { Component, OnInit, Input } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types/dist/interfaces/raw/IScenario';

@Component({
  selector: 'ta-scenario-editor-item',
  templateUrl: './scenario-editor-item.component.html',
  styleUrls: ['./scenario-editor-item.component.scss']
})
export class ScenarioEditorItemComponent implements OnInit {

  @Input() scenario: IScenario;

  constructor() { }

  ngOnInit(): void {
  }

}

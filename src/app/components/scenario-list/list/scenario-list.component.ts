import { Component, OnInit, Input } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types/dist/interfaces/raw/IScenario';

@Component({
  selector: 'ta-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {

  @Input() scenarios: Array<IScenario>;

  @Input() newScenario: IScenario;

  constructor() { }

  ngOnInit(): void {
  }

  onCreateScenario(): void {

  }
}

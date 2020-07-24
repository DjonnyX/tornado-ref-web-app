import { Component, OnInit, Input } from '@angular/core';
import { IScenario } from '@djonnyx/tornado-types/dist/interfaces/raw/IScenario';

@Component({
  selector: 'ta-scenario-list-item',
  templateUrl: './scenario-list-item.component.html',
  styleUrls: ['./scenario-list-item.component.scss']
})
export class ScenarioListItemComponent implements OnInit {

  @Input() scenario: IScenario;

  constructor() { }

  ngOnInit(): void {
  }

}

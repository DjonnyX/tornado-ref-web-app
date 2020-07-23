import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { formatDT } from '@app/utils/dt-formatter.util';
import { IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-state-panel',
  templateUrl: './state-panel.component.html',
  styleUrls: ['./state-panel.component.scss']
})
export class StatePanelComponent implements OnInit {

  @Input() refInfo: IRef;

  @Input() hasShowRefInfo = true;

  @Input() searchFieldClass = "accent";

  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  formatLastUpdate(): string {
    return formatDT(this.refInfo.lastUpdate);
  }

  onSearch(pattern: string): void {
    this.search.emit(pattern);
  }
}

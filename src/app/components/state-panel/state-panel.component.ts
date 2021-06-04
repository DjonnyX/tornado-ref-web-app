import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { formatDT } from '@app/utils/dt-formatter.util';
import { IRef } from '@djonnyx/tornado-types';

export enum LayoutTypes {
  LIST,
  CARD,
}

@Component({
  selector: 'ta-state-panel',
  templateUrl: './state-panel.component.html',
  styleUrls: ['./state-panel.component.scss']
})
export class StatePanelComponent implements OnInit {

  public readonly LayoutTypes = LayoutTypes;

  @Input() refInfo: IRef;

  @Input() hasShowRefInfo = true;

  @Input() searchFieldClass = "accent";

  @Output() search = new EventEmitter<string>();

  @Output() layout = new EventEmitter<LayoutTypes>();

  @Output() showHiddenEntities = new EventEmitter<boolean>();

  layoutType: LayoutTypes;

  isShowHiddenEntities: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.onSwitchToCard();
  }

  formatlastUpdate(): string {
    return formatDT(this.refInfo.lastUpdate);
  }

  onSearch(pattern: string): void {
    this.search.emit(pattern);
  }

  onSwitchToList() {
    this.layoutType = LayoutTypes.LIST;
    this.layout.emit(this.layoutType);
  }

  onSwitchToCard() {
    this.layoutType = LayoutTypes.CARD;
    this.layout.emit(this.layoutType);
  }

  onToggleVisibleHiddenEntities() {
    this.isShowHiddenEntities = !this.isShowHiddenEntities;
    this.showHiddenEntities.emit(this.isShowHiddenEntities);
  }
}

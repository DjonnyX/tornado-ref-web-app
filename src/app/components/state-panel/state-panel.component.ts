import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LocalizationService } from '@app/services/localization/localization.service';
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

  @Input() layout: LayoutTypes;

  @Input() displayInactiveEntities: boolean;

  @Output() search = new EventEmitter<string>();

  @Output() changeLayout = new EventEmitter<LayoutTypes>();

  @Output() changeInactiveVisibility = new EventEmitter<boolean>();

  get buttonLayoutClasses() { return { ['tab-button__icon']: true, [`icon-filter-${this.layout === LayoutTypes.CARD ? 'card' : 'list'}`]: true }; }

  constructor(
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void { }

  formatlastUpdate(): string {
    return formatDT(this.refInfo.lastUpdate);
  }

  onSearch(pattern: string): void {
    this.search.emit(pattern);
  }

  onSwitchLayout() {
    this.changeLayout.emit(this.layout === LayoutTypes.LIST ? LayoutTypes.CARD : LayoutTypes.LIST);
  }

  onToggleVisibleHiddenEntities() {
    this.displayInactiveEntities = !this.displayInactiveEntities;
    this.changeInactiveVisibility.emit(this.displayInactiveEntities);
  }
}

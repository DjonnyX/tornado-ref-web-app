import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ITabListItem {
  name: string;
  data: any;
}

@Component({
  selector: 'ta-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit {

  private _items: Array<ITabListItem>;
  @Input() set items(v: Array<ITabListItem>) {
    if (this._items !== v) {
      this._items = v;

      if (this._isInitialized) {
        this.selectFirst();
      }
    }
  }
  get items() { return this._items; }

  selected: ITabListItem;

  @Output() select = new EventEmitter<ITabListItem>();

  private _isInitialized = false;

  constructor() { }

  ngOnInit(): void {
    this.selectFirst();

    this._isInitialized = true;
  }

  private selectFirst(): void {
    if (!!this.items && this.items.length > 0) {
      this.onSelect(this.items[0]);
    }
  }

  onSelect(item: ITabListItem): void {
    this.selected = item;

    this.select.emit(item);
  }
}

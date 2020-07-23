import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectContentFormModes } from './enums/select-content-form-modes.enum';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { ISelector, IProduct, INode, IEntity, NodeTypes } from '@djonnyx/tornado-types';

const TABS_COLLECTION = [
  NodeTypes.SELECTOR,
  NodeTypes.PRODUCT,
  NodeTypes.SELECTOR_NODE,
];

@Component({
  selector: 'ta-select-content-form',
  templateUrl: './select-content-form.component.html',
  styleUrls: ['./select-content-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectContentFormComponent implements OnInit {

  @ViewChild('tabGroup', { static: true }) private _tabGroup: MatTabGroup;

  private _contentSelectorsBinder$ = new Subject<void>();
  contentSelectorsBinder$ = this._contentSelectorsBinder$.asObservable();

  private _contentProductsBinder$ = new Subject<void>();
  contentProductsBinder$ = this._contentSelectorsBinder$.asObservable();

  private _contentNodesBinder$ = new Subject<void>();
  contentNodesBinder$ = this._contentSelectorsBinder$.asObservable();

  @Input() mode: SelectContentFormModes;

  @Input() nodes: Array<INode>;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: { [id: string]: ISelector };

  @Input() selectedDefaultEntityId: string;

  @Input() set defaultCollection(v: NodeTypes) {
    if (this._tabGroup) {
      this._tabGroup.selectedIndex = TABS_COLLECTION.indexOf(v);
    }
  }

  @Output() change = new EventEmitter<IEntity>();

  constructor() { }

  ngOnInit(): void { }

  onChangeTab(index: number) {
    this._contentSelectorsBinder$.next();
    this._contentProductsBinder$.next();
    this._contentNodesBinder$.next();
  }

  onChange(content: IEntity): void {
    this.change.emit(content);
  }

}

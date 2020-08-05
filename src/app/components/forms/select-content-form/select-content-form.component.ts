import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectContentFormRights } from './enums/select-content-form-modes.enum';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { ISelector, IProduct, INode, IEntity, NodeTypes, SelectorTypes } from '@djonnyx/tornado-types';

const TABS_COLLECTION = [
  SelectorTypes.SCHEMA_CATEGORY,
  SelectorTypes.MENU_CATEGORY,
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

  readonly SelectContentFormRights = SelectContentFormRights;

  private _contentMenuSelectorsBinder$ = new Subject<void>();
  contentMenuSelectorsBinder$ = this._contentMenuSelectorsBinder$.asObservable();

  private _contentSchemaSelectorsBinder$ = new Subject<void>();
  contentSchemaSelectorsBinder$ = this._contentSchemaSelectorsBinder$.asObservable();

  private _contentProductsBinder$ = new Subject<void>();
  contentProductsBinder$ = this._contentProductsBinder$.asObservable();

  private _contentNodesBinder$ = new Subject<void>();
  contentNodesBinder$ = this._contentNodesBinder$.asObservable();

  @Input() rights: Array<SelectContentFormRights>;

  @Input() nodes: Array<INode>;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: { [id: string]: ISelector };

  @Input() schemaSelectors: Array<ISelector>;

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
    this._contentMenuSelectorsBinder$.next();
    this._contentSchemaSelectorsBinder$.next();
    this._contentProductsBinder$.next();
    this._contentNodesBinder$.next();
  }

  onChange(content: IEntity): void {
    this.change.emit(content);
  }

  hasAllow(right: SelectContentFormRights): boolean {
    return this.rights.indexOf(right) > -1;
  }
}

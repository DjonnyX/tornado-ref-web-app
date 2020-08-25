import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectContentFormRights } from './enums/select-content-form-modes.enum';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { ISelector, IProduct, INode, IEntity, NodeTypes, SelectorTypes, IAsset, ILanguage } from '@djonnyx/tornado-types';

export const getTabsCollectionByRights = (rights: Array<SelectContentFormRights>): Array<NodeTypes | SelectorTypes> => {
  const result = new Array<NodeTypes | SelectorTypes>();

  rights.filter(right => {
    switch (right) {
      case SelectContentFormRights.CATEGORIES:
        result.push(SelectorTypes.MENU_CATEGORY);
        break;
      case SelectContentFormRights.SCHEMA_CATEGORY:
        result.push(SelectorTypes.SCHEMA_CATEGORY);
        break;
      case SelectContentFormRights.NODES:
        result.push(NodeTypes.SELECTOR_NODE);
        break;
      case SelectContentFormRights.PRODUCTS:
        result.push(NodeTypes.PRODUCT);
        break;
    }
  });

  return result;
}

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

  private _tabsCollection: Array<NodeTypes | SelectorTypes>;

  private _rights: Array<SelectContentFormRights>;

  @Input() set rights(v: Array<SelectContentFormRights>) {
    if (this._rights !== v) {
      this._rights = v;

      this._tabsCollection = getTabsCollectionByRights(this._rights);
  
      this.updateSelectedIndex();
    }
  }

  get rights() {
    return this._rights;
  }

  @Input() nodes: Array<INode>;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: { [id: string]: ISelector };

  @Input() assetsDictionary: { [id: string]: IAsset };

  @Input() schemaSelectors: Array<ISelector>;

  @Input() selectedDefaultEntityId: string;

  @Input() languages: Array<ILanguage>;

  @Input() defaultLanguage: ILanguage;

  private _defaultCollection: NodeTypes | SelectorTypes;

  @Input() set defaultCollection(v: NodeTypes | SelectorTypes) {
    this._defaultCollection = v;

    this.updateSelectedIndex();
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

  private updateSelectedIndex(): void {
    if (this._tabGroup) {
      this._tabGroup.selectedIndex = this._tabsCollection.indexOf(this._defaultCollection);
    }
  }
}

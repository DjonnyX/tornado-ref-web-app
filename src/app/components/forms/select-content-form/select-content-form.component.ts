import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectContentFormRights } from './enums/select-content-form-rights.enum';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import {
  ISelector, IProduct, INode, IEntity, NodeTypes, SelectorTypes, IAsset,
  ILanguage
} from '@djonnyx/tornado-types';
import { SelectContentFormModes } from './enums/select-content-form-modes.enum';

const getRightsByMode = (mode: SelectContentFormModes, depth: number): Array<SelectContentFormRights> => {
  const result = new Array<SelectContentFormRights>();
  if (mode === SelectContentFormModes.MENU) {
    result.push(SelectContentFormRights.CATEGORIES);
    result.push(SelectContentFormRights.PRODUCTS);
    result.push(SelectContentFormRights.NODES);
  } else if (mode === SelectContentFormModes.GROUP_MODIFIERS) {
    result.push(SelectContentFormRights.PRODUCTS);
  } else if (mode === SelectContentFormModes.SCHEMA_MODIFIERS) {
    if (depth === 0) {
      result.push(SelectContentFormRights.MODIFIERS_NODES);
      result.push(SelectContentFormRights.NODES);
      result.push(SelectContentFormRights.SCHEMA_CATEGORY);
    } else if (depth === 1) {
      result.push(SelectContentFormRights.PRODUCTS);
    }
  } else if (mode === SelectContentFormModes.SCHEMA_GROUP_MODIFIERS) {
      result.push(SelectContentFormRights.MODIFIERS_NODES);
  }

  return result;
}

const getTabsCollectionByMode = (mode: SelectContentFormModes, depth: number): Array<NodeTypes | SelectorTypes> => {
  const result = new Array<NodeTypes | SelectorTypes>();

  if (mode === SelectContentFormModes.MENU) {
    result.push(SelectorTypes.MENU_CATEGORY);
    result.push(NodeTypes.PRODUCT);
    result.push(NodeTypes.SELECTOR_NODE);
  } else if (mode === SelectContentFormModes.GROUP_MODIFIERS) {
    result.push(NodeTypes.PRODUCT);
  } else if (mode === SelectContentFormModes.SCHEMA_MODIFIERS) {
    if (depth === 0) {
      result.push(NodeTypes.SELECTOR_JOINT);
      result.push(NodeTypes.SELECTOR_NODE);
      result.push(SelectorTypes.SCHEMA_CATEGORY);
    } else if (depth === 1) {
      result.push(NodeTypes.PRODUCT);
    }
  } else if (mode === SelectContentFormModes.SCHEMA_GROUP_MODIFIERS) {
      result.push(NodeTypes.SELECTOR_JOINT);
      result.push(NodeTypes.SELECTOR_NODE);
      result.push(SelectorTypes.SCHEMA_CATEGORY);
  }

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

  private _contentModifierNodesBinder$ = new Subject<void>();
  contentModifierNodesBinder$ = this._contentModifierNodesBinder$.asObservable();

  private _tabsCollection: Array<NodeTypes | SelectorTypes>;

  private _rights: Array<SelectContentFormRights>;
  get rights() {
    return this._rights;
  }

  @Input() multi: boolean = false;

  private _depth: number;
  @Input() set depth(v: number) {
    if (this._depth !== v) {
      this._depth = v;

      if (this._mode !== undefined) {
        this._tabsCollection = getTabsCollectionByMode(this._mode, this._depth);
        this._rights = getRightsByMode(this._mode, this._depth);

        this.updateSelectedIndex();
      }
    }
  }
  get depth() {
    return this._depth;
  }

  private _mode: SelectContentFormModes;
  @Input() set mode(v: SelectContentFormModes) {
    if (this._mode !== v) {
      this._mode = v;

      if (this._depth !== undefined) {
        this._tabsCollection = getTabsCollectionByMode(this._mode, this._depth);
        this._rights = getRightsByMode(this._mode, this._depth);

        this.updateSelectedIndex();
      }
    }
  }
  get mode() {
    return this._mode;
  }

  @Input() nodes: Array<INode>;

  @Input() groupModifiersNodes: Array<INode>;

  @Input() groupMenuNodes: Array<INode>;

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

  @Output() change = new EventEmitter<Array<IEntity> | IEntity>();

  constructor() { }

  ngOnInit(): void { }

  onChangeTab(index: number) {
    this._contentMenuSelectorsBinder$.next();
    this._contentSchemaSelectorsBinder$.next();
    this._contentProductsBinder$.next();
    this._contentNodesBinder$.next();
    this._contentModifierNodesBinder$.next();
  }

  onChange(content: Array<IEntity> | IEntity): void {
    this.change.emit(content);
  }

  hasAllow(right: SelectContentFormRights): boolean {
    return this.rights.indexOf(right) > -1;
  }

  private updateSelectedIndex(): void {
    if (!!this._tabGroup && !!this._tabsCollection) {
      const index = this._tabsCollection.indexOf(this._defaultCollection);

      if (index > -1) {
        // показывается только таб текущего контента
        this._rights = [this._rights[index]];
      }
    }
  }
}

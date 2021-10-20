import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NodeTreeModes } from './enums/node-tree-modes.enum';
import {
  INode, IProduct, ISelector, IRef, IBusinessPeriod, IAsset, ICurrency, ILanguage,
  IOrderType, IStore, SelectorTypes, NodeTypes
} from '@djonnyx/tornado-types';
import { getMapOfCollection, ICollectionDictionary } from '@app/utils/collection.util';
import { ITabListItem } from '@components/tab-list/tab-list.component';
import { NodeTreeStores } from './enums/node-tree-stores.enum';

@Component({
  selector: 'ta-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NodeTreeComponent implements OnInit {

  @Output() changeDisplayInactiveEntities = new EventEmitter<boolean>();

  private _displayInactiveEntities: boolean = true;
  @Input() set displayInactiveEntities(v: boolean) {
    if (this._displayInactiveEntities !== v) {
      this._displayInactiveEntities = v;
    }
  }
  get displayInactiveEntities() { return this._displayInactiveEntities; }

  rootNode: INode;

  nodesDictionary: ICollectionDictionary<INode>;

  productsDictionary: ICollectionDictionary<IProduct>;

  selectorsDictionary: ICollectionDictionary<ISelector>;

  currenciesDictionary: ICollectionDictionary<ICurrency>;

  _currencies: Array<ICurrency>;
  @Input() set currencies(v: Array<ICurrency>) {
    if (this._currencies !== v) {
      this._currencies = v;
      this.currenciesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get currencies() { return this._currencies; }

  storesCollection: Array<IStore>;
  storesDictionary: ICollectionDictionary<IStore>;

  @Input() set stores(v: Array<IStore>) {
    if (this.storesCollection !== v) {
      this.storesCollection = v;
      this.storesDictionary = !!v ? getMapOfCollection(v, "id") : {};

      const byAll = {
        name: "По всем магазинам", data: {
          id: NodeTreeStores.ALL,
        }
      };

      const tabs: Array<ITabListItem> = v.map(s => ({
        name: s.name,
        data: {
          id: s.id,
        },
      }));

      tabs.unshift(byAll);

      this._tabs = tabs;
    }
  }

  @Input() searchFieldClass: string;

  private _rootNodeId: string;
  @Input() set rootNodeId(v: string) {
    if (this._rootNodeId !== v) {
      this._rootNodeId = v;

      this.resetRootNode();
    }
  }
  get rootNodeId() { return this._rootNodeId; }

  private _menuRootNode: INode;

  private _nodes: Array<INode>;
  @Input() set nodes(v: Array<INode>) {
    if (this._nodes !== v) {
      this._nodes = v;
      this.nodesDictionary = !!v ? getMapOfCollection(v, "id") : {};
      this._menuRootNode = v.find(n => n.type === NodeTypes.KIOSK_ROOT);
      this._groupMenuNodes = this.buildMenuNodes(this._menuRootNode);
      this.resetRootNode();
    }
  }
  get nodes() { return this._nodes; }

  private buildMenuNodes(node: INode): Array<INode> {
    let result = [];
    if (!!node) {
      if (node.type === NodeTypes.SELECTOR) {
        result.push(node);
      }

      if (!!node.children) {
        node.children.forEach(c => {
          const n = this.nodesDictionary[c];
          if (!!n) {
            result.push(...this.buildMenuNodes(n));
          }
        })
      }
    }
    return result;
  }

  private _selectors: Array<ISelector>;
  @Input() set selectors(v: Array<ISelector>) {
    if (this._selectors !== v) {
      this._selectors = v;
      this._menuGroupsSelectors = v.filter(s => s.type === SelectorTypes.MENU_CATEGORY);
      this._modifiersGroupsSelectors = v.filter(s => s.type === SelectorTypes.SCHEMA_CATEGORY);

      this.resetNodes();

      this.selectorsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get selectors() { return this._selectors; }

  private _groupModifiersNodes: Array<INode>;
  get groupModifiersNodes() { return this._groupModifiersNodes; }

  private _groupMenuNodes: Array<INode>;
  get groupMenuNodes() { return this._groupMenuNodes; }

  private _menuGroupsSelectors: Array<ISelector>;
  get menuGroupsSelectors() { return this._menuGroupsSelectors; }

  private _modifiersGroupsSelectors: Array<ISelector>;
  get modifiersGroupsSelectors() { return this._modifiersGroupsSelectors; }

  private resetNodes() {
    if (!!this.nodesDictionary && !!this._menuGroupsSelectors && !!this._modifiersGroupsSelectors) {
      this._groupModifiersNodes = this._modifiersGroupsSelectors.map(s => this.nodesDictionary[s.joint]);
    }
  }

  private _products: Array<IProduct>;
  @Input() set products(v: Array<IProduct>) {
    if (this._products !== v) {
      this._products = v;
      this.productsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get products() { return this._products; }

  private _businessPeriods: Array<IBusinessPeriod>;
  @Input() set businessPeriods(v: Array<IBusinessPeriod>) {
    if (this._businessPeriods !== v) {
      this._businessPeriods = v;
      this.businessPeriodsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get businessPeriods() { return this._businessPeriods; }

  businessPeriodsDictionary: ICollectionDictionary<IBusinessPeriod>;

  private _assets: Array<IAsset>;

  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;
      this.assetsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }

  get assets() {
    return this._assets;
  }

  @Input() defaultLanguage: ILanguage;

  private _languages: Array<ILanguage>;

  @Input() set languages(v: Array<ILanguage>) {
    if (this._languages !== v) {
      this._languages = v;
      this.languagesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }

  get languages() {
    return this._languages;
  }

  languagesDictionary: ICollectionDictionary<ILanguage>;

  private _orderTypes: Array<IOrderType>;

  @Input() set orderTypes(v: Array<IOrderType>) {
    if (this._orderTypes !== v) {
      this._orderTypes = v;
      this.orderTypesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }

  get orderTypes() {
    return this._orderTypes;
  }

  orderTypesDictionary: ICollectionDictionary<IOrderType>;

  assetsDictionary: ICollectionDictionary<IAsset>;

  private _tabs: Array<ITabListItem>;
  get tabs() { return this._tabs; }

  currentStoreId: string;

  @Output() create = new EventEmitter<Array<INode>>();

  @Output() update = new EventEmitter<INode>();

  @Output() delete = new EventEmitter<INode>();

  @Input() refInfo: IRef;

  @Input() mode: NodeTreeModes;

  @Input() hasShowRefInfo = true;

  searchPattern: string;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
    this._cdr.markForCheck();
  }

  onCreate(nodes: Array<INode>): void {
    this.create.emit(nodes);
  }

  onUpdate(node: INode): void {
    this.update.emit(node);
  }

  onDelete(node: INode): void {
    this.delete.emit(node);
  }

  onTabSelect(tab: ITabListItem): void {
    this.currentStoreId = tab.data.id;
  }

  private resetRootNode(): void {
    if (!this._rootNodeId || !this._nodes) {
      return;
    }

    this.rootNode = this._nodes.find(item => item.id === this._rootNodeId);
  }

  onShowHiddenEntities(displayInactiveEntities: boolean) {
    this.changeDisplayInactiveEntities.emit(displayInactiveEntities);
  }
}

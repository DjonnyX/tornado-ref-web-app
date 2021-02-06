import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { NodeTreeModes } from './enums/node-tree-modes.enum';
import { INode, IProduct, ISelector, IRef, IBusinessPeriod, IAsset, ICurrency, ILanguage, IOrderType, IStore } from '@djonnyx/tornado-types';
import { getMapOfCollection, ICollectionDictionary } from '@app/utils/collection.util';

@Component({
  selector: 'ta-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NodeTreeComponent implements OnInit {

  rootNode: INode;

  nodesCollection: Array<INode>;
  nodesDictionary: ICollectionDictionary<INode>;

  productsCollection: Array<IProduct>;
  productsDictionary: ICollectionDictionary<IProduct>;

  selectorsCollection: Array<ISelector>;
  selectorsDictionary: ICollectionDictionary<ISelector>;

  currenciesCollection: Array<ICurrency>;
  currenciesDictionary: ICollectionDictionary<ICurrency>;

  @Input() set currencies(v: Array<ICurrency>) {
    if (this.currenciesCollection !== v) {
      this.currenciesCollection = v;
      this.currenciesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }

  storesCollection: Array<IStore>;
  storesDictionary: ICollectionDictionary<IStore>;

  @Input() set stores(v: Array<IStore>) {
    if (this.storesCollection !== v) {
      this.storesCollection = v;
      this.storesDictionary = !!v ? getMapOfCollection(v, "id") : {};
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

  @Input() set nodes(v: Array<INode>) {
    if (this.nodesCollection !== v) {
      this.nodesCollection = v;
      this.nodesDictionary = !!v ? getMapOfCollection(v, "id") : {};

      this.resetRootNode();
    }
  }

  @Input() set selectors(v: Array<ISelector>) {
    if (this.selectorsCollection !== v) {
      this.selectorsCollection = v;
      this.selectorsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }

  @Input() set products(v: Array<IProduct>) {
    if (this.productsCollection !== v) {
      this.productsCollection = v;
      this.productsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }

  private _businessPeriods: Array<IBusinessPeriod>;

  @Input() set businessPeriods(v: Array<IBusinessPeriod>) {
    if (this._businessPeriods !== v) {
      this._businessPeriods = v;
      this.businessPeriodsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }

  get businessPeriods() {
    return this._businessPeriods;
  }

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

  @Output() create = new EventEmitter<INode>();

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

  onCreate(node: INode): void {
    this.create.emit(node);
  }

  onUpdate(node: INode): void {
    this.update.emit(node);
  }

  onDelete(node: INode): void {
    this.delete.emit(node);
  }

  private resetRootNode(): void {
    if (!this._rootNodeId || !this.nodesCollection) {
      return;
    }

    this.rootNode = this.nodesCollection.find(item => item.id === this._rootNodeId);
  }
}

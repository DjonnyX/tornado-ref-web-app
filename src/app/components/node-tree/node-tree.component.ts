import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { NodeTreeModes } from './enums/node-tree-modes.enum';
import { IEntity, INode, IProduct, ISelector, IRef, IBusinessPeriod, IAsset, ICurrency, ILanguage } from '@djonnyx/tornado-types';

interface IDictionary<T = any> {
  [id: string]: T;
}

const getMapOfCollection = <T extends IEntity>(collection: Array<T>): IDictionary<T> => {
  const result: IDictionary<T> = {};

  collection.forEach(item => {
    result[item.id] = item;
  });

  return result;
}

@Component({
  selector: 'ta-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NodeTreeComponent implements OnInit {

  rootNode: INode;

  nodesCollection: Array<INode>;
  nodesDictionary: { [id: string]: INode };

  productsCollection: Array<IProduct>;
  productsDictionary: { [id: string]: IProduct };

  selectorsCollection: Array<ISelector>;
  selectorsDictionary: { [id: string]: ISelector };

  currenciesCollection: Array<ICurrency>;
  currenciesDictionary: { [id: string]: ICurrency };

  @Input() set currencies(v: Array<ICurrency>) {
    if (this.currenciesCollection !== v) {
      this.currenciesCollection = v;
      this.currenciesDictionary = !!v ? getMapOfCollection(v) : {};
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
      this.nodesDictionary = !!v ? getMapOfCollection(v) : {};

      this.resetRootNode();
    }
  }

  @Input() set selectors(v: Array<ISelector>) {
    if (this.selectorsCollection !== v) {
      this.selectorsCollection = v;
      this.selectorsDictionary = !!v ? getMapOfCollection(v) : {};
    }
  }

  @Input() set products(v: Array<IProduct>) {
    if (this.productsCollection !== v) {
      this.productsCollection = v;
      this.productsDictionary = !!v ? getMapOfCollection(v) : {};
    }
  }

  private _businessPeriods: Array<IBusinessPeriod>;

  @Input() set businessPeriods(v: Array<IBusinessPeriod>) {
    if (this._businessPeriods !== v) {
      this._businessPeriods = v;
      this.businessPeriodsDictionary = !!v ? getMapOfCollection(v) : {};
    }
  }

  get businessPeriods() {
    return this._businessPeriods;
  }

  businessPeriodsDictionary: { [id: string]: IBusinessPeriod };

  private _assets: Array<IAsset>;

  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;
      this.assetsDictionary = !!v ? getMapOfCollection(v) : {};
    }
  }

  get assets() {
    return this._assets;
  }

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  assetsDictionary: { [id: string]: IAsset };

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

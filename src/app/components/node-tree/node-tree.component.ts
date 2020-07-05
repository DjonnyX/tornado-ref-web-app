import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { INode, IProduct, ISelector, IEntity, IRef } from '@models';
import { NodeTypes } from '@app/enums/node-types.enum';
import { NodeTreeModes } from './enums/node-tree-modes.enum';

interface IDictionary<T = any> {
  [
  id: string]: T;
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
  styleUrls: ['./node-tree.component.scss']
})
export class NodeTreeComponent implements OnInit {

  rootNode: INode;

  nodesCollection: Array<INode>;
  nodesDictionary: { [id: string]: INode };

  productsCollection: Array<IProduct>;
  productsDictionary: { [id: string]: IProduct };

  selectorsCollection: Array<ISelector>;
  selectorsDictionary: { [id: string]: ISelector };

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

  @Output() create = new EventEmitter<INode>();

  @Output() update = new EventEmitter<INode>();

  @Output() delete = new EventEmitter<INode>();

  @Input() refInfo: IRef;

  @Input() mode: NodeTreeModes;

  @Input() hasShowRefInfo = true;

  searchPattern: string;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("onInit")
  }

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

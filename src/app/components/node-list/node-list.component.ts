import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { NodeTypes } from '@app/enums/node-types.enum';
import { INode, ISelector } from '@models';

interface IProxyItem extends INode {
  selected?: boolean;
}

@Component({
  selector: 'ta-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeListComponent implements OnInit {

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: { [id: string]: ISelector };

  proxyCollection: Array<IProxyItem>;

  private _collection: Array<INode>;
  @Input() set collection(v: Array<INode>) {
    if (this._collection !== v) {
      this._collection = v;

      this.proxyCollection = [];

      if (!!v) {
        v.forEach(item => {
          this.proxyCollection.push({...item});
        });
      }
    }
  }

  get collection() {
    return this._collection;
  }

  @Input() type: NodeTypes | string;

  @Output() change = new EventEmitter<INode>();

  constructor() { }

  ngOnInit(): void {
  }
  
  getContentName(node: INode): string {
    if (!!this.selectorsDictionary && node.type === NodeTypes.SELECTOR) {
      const content = this.selectorsDictionary[node.contentId];
      return !!content ? content.name : "";
    }

    return "";
  }

  onToggleSelect(item: IProxyItem): void {
    item.selected = !item.selected;

    if (item.selected) {
      this.proxyCollection.forEach(element => {
        if (element.id !== item.id) {
          element.selected = false;
        }
      });
    }

    this.change.emit(!!item.selected ? {...item, type: this.type} : null);
  }
}

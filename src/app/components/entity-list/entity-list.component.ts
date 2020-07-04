import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { NodeTypes } from '@app/enums/node-types.enum';

interface IEntity {
  id: string;
  type: NodeTypes | string;
  name: string;
  description?: string;
}

interface IProxyItem extends IEntity {
  selected?: boolean;
}

@Component({
  selector: 'ta-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent implements OnInit {

  proxyCollection: Array<IProxyItem>;

  private _collection: Array<IEntity>;
  @Input() set collection(v: Array<IEntity>) {
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

  @Output() change = new EventEmitter<IEntity>();

  constructor() { }

  ngOnInit(): void {
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

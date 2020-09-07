import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { NodeTypes, IAsset, ILanguage, IEntityContentsItem, IEntityContents } from '@djonnyx/tornado-types';

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
export class EntityListComponent extends BaseComponent implements OnInit, OnDestroy {

  proxyCollection: Array<IProxyItem>;

  private _collection: Array<IEntity>;
  @Input() set collection(v: Array<IEntity>) {
    if (this._collection !== v) {
      this._collection = v;

      this.proxyCollection = [];

      if (!!v) {
        v.forEach(item => {
          this.proxyCollection.push({ ...item });
        });

        this.resetDefaultItem();
      }
    }
  }

  get collection() {
    return this._collection;
  }

  @Input() languages: Array<ILanguage>;

  @Input() defaultLanguage: ILanguage;

  @Input() type: NodeTypes | string;

  @Input() binder$: Observable<void>;

  private _selectedDefaultEntityId: string;
  @Input() set selectedDefaultEntityId(v: string) {
    if (this._selectedDefaultEntityId !== v) {
      this._selectedDefaultEntityId = v;

      this.resetDefaultItem();
    }
  }

  @Input() assetsDictionary: { [id: string]: IAsset };

  @Output() change = new EventEmitter<IEntity>();

  constructor(private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.binder$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.reset();
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.binder$ = null;
  }

  resetDefaultItem(): void {
    if (!!this.proxyCollection && !!this._selectedDefaultEntityId) {
      this.proxyCollection.forEach(item => {
        item.selected = item.id === this._selectedDefaultEntityId;
      });

      this._cdr.markForCheck();
    }
  }

  getContent(entity: {
    contents: IEntityContents;
  }): IEntityContentsItem {
    return entity.contents[this.defaultLanguage.code];
  }

  getThumbnail(entity: {
    contents: IEntityContents;
  }): string {
    const entityContent = this.getContent(entity);
    const img = !!entityContent ? (entityContent as any)?.resources?.main : undefined;

    if (!!this.assetsDictionary && !!img) {

      if (this.assetsDictionary[img]) {
        return this.assetsDictionary[img].mipmap.x32;
      }
    }

    return "";
  }
  
  getName(entity: {
    contents: IEntityContents;
  }): string | undefined {
    const entityContent = this.getContent(entity);
    return !!entityContent ? (entityContent as any).name : undefined;
  }

  reset(): void {
    this.resetDefaultItem();

    this.change.emit(null);

    this._cdr.markForCheck();
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

    this.change.emit(!!item.selected ? { ...item, type: this.type } : null);
  }
}

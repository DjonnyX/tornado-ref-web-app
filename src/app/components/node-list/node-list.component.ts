import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ISelector, INode, NodeTypes, IAsset, IEntity, ILanguage, IEntityContents, IEntityContentsItem } from '@djonnyx/tornado-types';

interface IProxyItem extends INode {
  selected?: boolean;
}

@Component({
  selector: 'ta-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeListComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: { [id: string]: ISelector };

  @Input() binder$: Observable<void>;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  private _selectedDefaultEntityId: string;
  @Input() set selectedDefaultEntityId(v: string) {
    if (this._selectedDefaultEntityId !== v) {
      this._selectedDefaultEntityId = v;

      this.resetDefaultItem();
    }
  }

  @Input() assetsDictionary: { [id: string]: IAsset };

  proxyCollection: Array<IProxyItem>;

  private _collection: Array<INode>;
  @Input() set collection(v: Array<INode>) {
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

  @Input() type: NodeTypes | string;

  @Output() change = new EventEmitter<INode>();

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

  getContent(entity: {
    contents: IEntityContents;
  }): IEntityContentsItem {
    return entity.contents[this.defaultLanguage.code];
  }
  
  getName(entity: {
    contents: IEntityContents;
  }): string | undefined {
    const entityContent = this.getContent(entity);
    return !!entityContent ? (entityContent as any).name : undefined;
  }

  getThumbnail(node: INode): string {
    const content: any = this.getNodeContent(node);
    const entityContent = this.getContent(content);
    const img = !!entityContent ? (entityContent as any)?.images?.main : undefined;

    if (!!this.assetsDictionary && !!img) {
      if (this.assetsDictionary[img]) {
        return this.assetsDictionary[img].mipmap.x32;
      }
    }

    return "";
  }

  resetDefaultItem(): void {
    if (!!this.proxyCollection && !!this._selectedDefaultEntityId) {
      this.proxyCollection.forEach(item => {
        item.selected = item.id === this._selectedDefaultEntityId;
      });

      this._cdr.markForCheck();
    }
  }

  reset(): void {
    this.resetDefaultItem();

    this.change.emit(null);

    this._cdr.markForCheck();
  }

  getNodeContent(node: INode): ISelector | null {
    if (!!this.selectorsDictionary && node.type === NodeTypes.SELECTOR) {
      return this.selectorsDictionary[node.contentId];
    }

    return null;
  }

  getContentName(node: INode): string {
    const content = this.getNodeContent(node);
    return this.getName(content);
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

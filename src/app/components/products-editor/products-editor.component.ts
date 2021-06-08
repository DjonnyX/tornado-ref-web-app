import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset } from '@models';
import { IProduct, IRef, ITag, ILanguage, IProductContentsItem, UserRights, ISystemTag } from '@djonnyx/tornado-types';
import { ITagContentsItem } from '@djonnyx/tornado-types/dist/interfaces/raw/ITagContents';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {
  transform(items: Array<IProduct>, systemTag: ISystemTag | undefined): any[] {
    if (!items) return [];
    return items.filter(p => p.systemTag === systemTag?.id);
  }

}

@Component({
  selector: 'ta-products-editor-component',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  private _collection: Array<IProduct>;
  @Input() set collection(v: Array<IProduct>) {
    if (this._collection !== v) {
      this._collection = v;

      this.resetActualSystemTags();
    }
  }
  get collection() { return this._collection; }

  private _systemTags: Array<ISystemTag>;
  @Input() set systemTags(v: Array<ISystemTag>) {
    if (this._systemTags !== v) {
      this._systemTags = v;

      this.resetActualSystemTags();
    }
  }
  get systemTags() { return this._systemTags; }

  actualSystemTags: Array<ISystemTag>;

  @Input() refInfo: IRef;

  @Input() tagList: Array<ITag>;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  @Input() rights: Array<UserRights>;

  private _assetsDictionary: { [id: string]: IAsset } = {};

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;

      this._assets.forEach(asset => {
        this._assetsDictionary[asset.id] = asset;
      });
    }
  }

  get assets() { return this._assets; }

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IProduct>();

  @Output() update = new EventEmitter<IProduct>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  resetActualSystemTags() {
    if (!this._collection || !this._systemTags) {
      return;
    }

    const systemTags: Array<string> = [];
    for (let product of this._collection) {
      if (product.systemTag !== undefined && systemTags.indexOf(product.systemTag) === -1) {
        systemTags.push(product.systemTag);
      }
    }

    this.actualSystemTags = this._systemTags.filter(s => {
      console.log(s.id, systemTags)
      return systemTags.indexOf(s.id) > -1;
    });

    // не распределенная категория
    this.actualSystemTags.push(undefined);
  }

  getProductContent(product: IProduct): IProductContentsItem {
    return product.contents[this.defaultLanguage.code];
  }

  getTagContent(tag: ITag): ITagContentsItem {
    if (!tag) {
      return undefined;
    }

    return tag?.contents[this.defaultLanguage.code];
  }

  getTagColor(id: string): string {
    const tag = this.tagList?.find(t => t.id === id);
    const tagContent = this.getTagContent(tag);
    return tagContent?.color || "";
  }

  getTagName(id: string): string {
    const tag = this.tagList?.find(t => t.id === id);
    const tagContent = this.getTagContent(tag);
    return tagContent?.name || "";
  }

  getProductName(product: IProduct): string | undefined {
    const productContent = this.getProductContent(product);
    return !!productContent ? productContent.name : undefined;
  }

  getProductDescription(product: IProduct): string | undefined {
    const productContent = this.getProductContent(product);
    return !!productContent ? productContent.description : undefined;
  }

  getProductColor(product: IProduct): string | undefined {
    const productContent = this.getProductContent(product);
    return !!productContent ? productContent.color : undefined;
  }

  hasThumbnail(product: IProduct, size: "x32" | "x128" = "x32"): boolean {
    const productContent = this.getProductContent(product);
    const asset = !!productContent && !!productContent.resources && !!productContent.resources.main ? this._assetsDictionary[productContent.resources.main] : undefined;
    return !!asset?.mipmap?.[size];
  }

  getThumbnail(product: IProduct, size: "x32" | "x128" = "x32"): string {
    const productContent = this.getProductContent(product);
    const asset = !!productContent && !!productContent.resources && !!productContent.resources.main ? this._assetsDictionary[productContent.resources.main] : undefined;
    return asset?.mipmap?.[size]?.replace("\\", "/");
  }

  onToggleActive(event: Event, product: IProduct): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...product, active: !product.active });
  }

  onCreateProduct(): void {
    this.create.emit();
  }

  onEditProduct(product: IProduct): void {
    this.edit.emit(product);
  }

  onDeleteProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить продукт?",
          message: `"${this.getProductName(product)}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(product.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  hasCreate() {
    return this.rights.indexOf(UserRights.CREATE_PRODUCT) > -1;
  }

  hasDelete() {
    return this.rights.indexOf(UserRights.DELETE_PRODUCT) > -1;
  }
}

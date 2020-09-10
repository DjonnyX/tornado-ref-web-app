import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset } from '@models';
import { IProduct, IRef, ITag, ILanguage, IProductContentsItem } from '@djonnyx/tornado-types';
import { ITagContentsItem } from '@djonnyx/tornado-types/dist/interfaces/raw/ITagContents';

@Component({
  selector: 'ta-products-editor-component',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IProduct>;

  @Input() refInfo: IRef;

  @Input() tagList: Array<ITag>;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

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
    const tag = this.tagList.find(t => t.id === id);
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

  hasThumbnail(product: IProduct): boolean {
    const productContent = this.getProductContent(product);
    const asset = !!productContent && !!productContent.resources && !!productContent.resources.main ? this._assetsDictionary[productContent.resources.main] : undefined;
    return !!asset && !!asset.mipmap && !!asset.mipmap.x128;
  }

  getThumbnail(product: IProduct): string {
    const productContent = this.getProductContent(product);
    const asset = !!productContent && !!productContent.resources && !!productContent.resources.main ? this._assetsDictionary[productContent.resources.main] : undefined;
    return !!asset && !!asset.mipmap && !!asset.mipmap.x32 ? asset.mipmap.x32.replace("\\", "/") : "";
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
}

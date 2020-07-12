import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '@app/models/product.model';
import { IRef } from '@app/models/ref.model';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, IAsset } from '@models';
import { getThumbnail } from '@app/utils/asset.util';

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

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getTagColor(id: string): string {
    const tag = !!this.tagList ? this.tagList.find(t => t.id === id) : undefined;
    return !!tag ? tag.color : "";
  }

  getTagName(id: string): string {
    const tag = !!this.tagList ? this.tagList.find(t => t.id === id) : undefined;
    return !!tag ? tag.name : "";
  }

  hasThumbnail(assetId: string): boolean {
    const asset = this._assetsDictionary[assetId];
    return !!asset && !!asset.thumbnail;
  }

  getThumbnail(assetId: string): string {
    const asset = this._assetsDictionary[assetId];
    return !!asset && !!asset.thumbnail ? asset.thumbnail.replace("\\", "/") : ""; //getThumbnail(asset);
  }

  onShowMenu($event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
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
          title: "Delete the product?",
          message: `"${product.name}" will be permanently deleted`,
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

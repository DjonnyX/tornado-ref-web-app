import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IOrderType, IRef, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-order-types-editor-component',
  templateUrl: './order-types-editor.component.html',
  styleUrls: ['./order-types-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IOrderType>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";
  
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

  @Output() edit = new EventEmitter<IOrderType>();

  @Output() update = new EventEmitter<IOrderType>();

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
  
  hasThumbnail(assetId: string): boolean {
    const asset = this._assetsDictionary[assetId];
    return !!asset && !!asset.mipmap && !!asset.mipmap.x128;
  }

  getThumbnail(assetId: string): string {
    const asset = this._assetsDictionary[assetId];
    return !!asset && !!asset.mipmap && !!asset.mipmap.x32 ? asset.mipmap.x32.replace("\\", "/") : "";
  }

  onToggleActive(event: Event, orderType: IOrderType): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...orderType, active: !orderType.active });
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(orderType: IOrderType): void {
    this.edit.emit(orderType);
  }

  onDelete(orderType: IOrderType): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Delete the orderType?",
          message: `"${orderType.name}" will be permanently deleted`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(orderType.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

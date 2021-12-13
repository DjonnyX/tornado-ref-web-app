import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IOrderType, IRef, IAsset, IOrderTypeContentsItem, ILanguage } from '@djonnyx/tornado-types';

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

  @Output() edit = new EventEmitter<IOrderType>();

  @Output() update = new EventEmitter<IOrderType>();

  @Output() updateAll = new EventEmitter<IOrderType>();

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

  getContent(orderType: IOrderType): IOrderTypeContentsItem {
    return orderType.contents[this.defaultLanguage.code];
  }

  getName(orderType: IOrderType): string | undefined {
    const orderTypeContent = this.getContent(orderType);
    return !!orderTypeContent ? orderTypeContent.name : undefined;
  }

  getDescription(orderType: IOrderType): string | undefined {
    const orderTypeContent = this.getContent(orderType);
    return !!orderTypeContent ? orderTypeContent.description : undefined;
  }

  getColor(orderType: IOrderType): string | undefined {
    const orderTypeContent = this.getContent(orderType);
    return !!orderTypeContent ? orderTypeContent.color : undefined;
  }

  hasThumbnail(orderType: IOrderType, size: "x32" | "x128" = "x32"): boolean {
    const orderTypeContent = this.getContent(orderType);
    const asset = !!orderTypeContent && !!orderTypeContent.resources && !!orderTypeContent.resources.main ? this._assetsDictionary[orderTypeContent.resources.main] : undefined;
    return !!asset?.mipmap?.[size];
  }

  getThumbnail(orderType: IOrderType, size: "x32" | "x128" = "x32"): string {
    const orderTypeContent = this.getContent(orderType);
    const asset = !!orderTypeContent && !!orderTypeContent.resources && !!orderTypeContent.resources.main ? this._assetsDictionary[orderTypeContent.resources.main] : undefined;
    return asset?.mipmap?.[size]?.replace("\\", "/");
  }

  onToggleActive(event: Event, orderType: IOrderType): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...orderType, active: !orderType.active });
  }

  onToggleDefault(event: Event, orderType: IOrderType): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.updateAll.emit({ ...orderType, isDefault: !orderType.isDefault });
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
          title: "common_dialog-delete-the-order-type",
          message: `#{"${this.getName(orderType)}" }common_action-will-be-permanently-deleted`,
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

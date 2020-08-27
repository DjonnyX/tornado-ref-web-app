import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IRef, IAsset, ILanguageContentsItem, ILanguage } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-languages-editor-component',
  templateUrl: './languages-editor.component.html',
  styleUrls: ['./languages-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ILanguage>;

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

  @Output() edit = new EventEmitter<ILanguage>();

  @Output() update = new EventEmitter<ILanguage>();

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

  getContent(orderType: ILanguage): ILanguageContentsItem {
    return orderType.contents[this.defaultLanguage.code];
  }

  getName(orderType: ILanguage): string | undefined {
    const orderTypeContent = this.getContent(orderType);
    return !!orderTypeContent ? orderTypeContent.name : undefined;
  }

  getColor(orderType: ILanguage): string | undefined {
    const orderTypeContent = this.getContent(orderType);
    return !!orderTypeContent ? orderTypeContent.color : undefined;
  }

  hasThumbnail(orderType: ILanguage): boolean {
    const orderTypeContent = this.getContent(orderType);
    const asset = !!orderTypeContent && !!orderTypeContent.images && !!orderTypeContent.images.main ? this._assetsDictionary[orderTypeContent.images.main] : undefined;
    return !!asset && !!asset.mipmap && !!asset.mipmap.x128;
  }

  getThumbnail(orderType: ILanguage): string {
    const orderTypeContent = this.getContent(orderType);
    const asset = !!orderTypeContent && !!orderTypeContent.images && !!orderTypeContent.images.main ? this._assetsDictionary[orderTypeContent.images.main] : undefined;
    return !!asset && !!asset.mipmap && !!asset.mipmap.x32 ? asset.mipmap.x32.replace("\\", "/") : "";
  }

  onToggleActive(event: Event, orderType: ILanguage): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...orderType, active: !orderType.active });
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(orderType: ILanguage): void {
    this.edit.emit(orderType);
  }

  onDelete(orderType: ILanguage): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Delete the orderType?",
          message: `"${this.getName(orderType)}" will be permanently deleted`,
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

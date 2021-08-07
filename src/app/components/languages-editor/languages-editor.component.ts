import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ILanguage, IRef, IAsset } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

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

  @Output() updateAll = new EventEmitter<ILanguage>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  hasThumbnail(assetId: string, size: "x32" | "x128" = "x32"): boolean {
    const asset = this._assetsDictionary[assetId];
    return !!asset?.mipmap?.[size];
  }

  getThumbnail(assetId: string, size: "x32" | "x128" = "x32"): string {
    const asset = this._assetsDictionary[assetId];
    return !!asset?.mipmap?.[size] ? asset.mipmap[size].replace("\\", "/") : "";
  }

  onToggleActive(event: Event, language: ILanguage): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...language, active: !language.active });
  }

  onToggleDefault(event: Event, language: ILanguage): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.updateAll.emit({ ...language, isDefault: !language.isDefault });
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(language: ILanguage): void {
    this.edit.emit(language);
  }

  onDelete(language: ILanguage): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-language",
          message: `#{"${language.name}" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(language.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

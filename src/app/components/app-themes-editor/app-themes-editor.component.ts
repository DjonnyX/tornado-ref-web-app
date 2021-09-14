import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAppTheme, IRef, IAsset, UserRights } from '@djonnyx/tornado-types';
import { ICompiledTheme } from '@app/utils/app-theme.util';
import { LayoutTypes } from '@components/state-panel/state-panel.component';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-app-themes-editor-component',
  templateUrl: './app-themes-editor.component.html',
  styleUrls: ['./app-themes-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly LayoutTypes = LayoutTypes;

  @Output() changeLayout = new EventEmitter<LayoutTypes>();

  @Output() changeDisplayInactiveEntities = new EventEmitter<boolean>();

  private _collection: Array<IAppTheme>;
  @Input() set collection(value: Array<IAppTheme>) {
    if (this._collection != value) {
      this._collection = value || [];

      this.resetFilteredCollection();
    }
  }

  public filteredCollection: Array<IAppTheme>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Input() rights: Array<UserRights>;

  @Input() layoutType: LayoutTypes;

  private _displayInactiveEntities: boolean = true;
  @Input() set displayInactiveEntities(v: boolean) {
    if (this._displayInactiveEntities !== v) {
      this._displayInactiveEntities = v;

      this.resetFilteredCollection();
    }
  }
  get displayInactiveEntities() { return this._displayInactiveEntities; }

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

  @Output() edit = new EventEmitter<IAppTheme>();

  @Output() update = new EventEmitter<IAppTheme>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    private _cdr: ChangeDetectorRef,
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

  hasCreate() {
    return this.rights.indexOf(UserRights.CREATE_AD) > -1;
  }

  hasDelete() {
    return this.rights.indexOf(UserRights.DELETE_AD) > -1;
  }

  resetFilteredCollection() {
    this.filteredCollection = (this._collection || []).filter(item => (!!item || !!this._displayInactiveEntities));
    this._cdr.markForCheck();
  }

  onSwitchLayout(layoutType: LayoutTypes) {
    this.changeLayout.emit(layoutType);
  }

  hasThumbnail(compiledTheme: ICompiledTheme, size: "x32" | "x128" = "x32"): boolean {
    return !!this._assetsDictionary?.[compiledTheme?.theme?.resources?.["thumbnail"]];
  }

  getThumbnail(compiledTheme: ICompiledTheme, size: "x32" | "x128" = "x32"): string {
    return this._assetsDictionary?.[compiledTheme?.theme?.resources?.["thumbnail"]]?.mipmap.x128;
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(compiledTheme: ICompiledTheme): void {
    this.edit.emit(compiledTheme.theme);
  }

  onDelete(compiledTheme: ICompiledTheme): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить тему?",
          message: `"${compiledTheme.theme.name}" будет безвозвратно удалена.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(compiledTheme.theme.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  onShowHiddenEntities(displayInactiveEntities: boolean) {
    this.changeDisplayInactiveEntities.emit(displayInactiveEntities);
  }
}

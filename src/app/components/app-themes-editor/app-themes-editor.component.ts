import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAppTheme, IRef, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-app-themes-editor-component',
  templateUrl: './app-themes-editor.component.html',
  styleUrls: ['./app-themes-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IAppTheme>;

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

  @Output() edit = new EventEmitter<IAppTheme>();

  @Output() update = new EventEmitter<IAppTheme>();

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

  getName(theme: IAppTheme): string | undefined {
    return theme.name;
  }

  hasThumbnail(theme: IAppTheme, size: "x32" | "x128" = "x32"): boolean {
    return false
  }

  getThumbnail(theme: IAppTheme, size: "x32" | "x128" = "x32"): string {
    return undefined;
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(theme: IAppTheme): void {
    this.edit.emit(theme);
  }

  onDelete(theme: IAppTheme): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить тему?",
          message: `"${this.getName(theme)}" будет безвозвратно удалена.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(theme.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

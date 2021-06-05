import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAppTheme, IRef, IAsset } from '@djonnyx/tornado-types';
import { ICompiledTheme } from '@app/utils/app-theme.util';

@Component({
  selector: 'ta-app-themes-editor-component',
  templateUrl: './app-themes-editor.component.html',
  styleUrls: ['./app-themes-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ICompiledTheme>;

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
}

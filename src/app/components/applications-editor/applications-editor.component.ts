import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IApplication, IRef, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-applications-editor-component',
  templateUrl: './applications-editor.component.html',
  styleUrls: ['./applications-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IApplication>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";
  
  /*private _assetsDictionary: { [id: string]: IAsset } = {};

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;

      this._assets.forEach(asset => {
        this._assetsDictionary[asset.id] = asset;
      });
    }
  }

  get assets() { return this._assets; }*/

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IApplication>();

  @Output() update = new EventEmitter<IApplication>();

  @Output() updateAll = new EventEmitter<IApplication>();

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
  
  onCreate(): void {
    this.create.emit();
  }

  onEdit(application: IApplication): void {
    this.edit.emit(application);
  }

  onDelete(application: IApplication): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить приложение?",
          message: `"${application.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(application.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

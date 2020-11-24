import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ILicenseType, IRef, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-license-types-editor-component',
  templateUrl: './license-types-editor.component.html',
  styleUrls: ['./license-types-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseTypesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ILicenseType>;

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

  @Output() edit = new EventEmitter<ILicenseType>();

  @Output() update = new EventEmitter<ILicenseType>();

  @Output() updateAll = new EventEmitter<ILicenseType>();

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

  onEdit(licenseType: ILicenseType): void {
    this.edit.emit(licenseType);
  }

  onDelete(licenseType: ILicenseType): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить тип лицензии?",
          message: `"${licenseType.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(licenseType.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

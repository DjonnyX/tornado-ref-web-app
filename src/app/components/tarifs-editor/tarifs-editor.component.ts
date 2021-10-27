import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITarif, IRef, IAsset } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-tarifs-editor-component',
  templateUrl: './tarifs-editor.component.html',
  styleUrls: ['./tarifs-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarifsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ITarif>;

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

  @Output() edit = new EventEmitter<ITarif>();

  @Output() update = new EventEmitter<ITarif>();

  @Output() updateAll = new EventEmitter<ITarif>();

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

  onCreate(): void {
    this.create.emit();
  }

  onEdit(tarif: ITarif): void {
    this.edit.emit(tarif);
  }

  hasDelete(): boolean {
    return true;
  }

  onDelete(tarif: ITarif): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-app",
          message: `#{"${tarif.name}"}common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(tarif.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

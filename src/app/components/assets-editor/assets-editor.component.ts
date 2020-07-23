import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAsset } from '@app/models/asset.model';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-assets-editor-component',
  templateUrl: './assets-editor.component.html',
  styleUrls: ['./assets-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IAsset>;

  @Input() refInfo: IRef;

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IAsset>();

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

  onShowMenu($event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onCreateAsset(): void {
    this.create.emit();
  }

  onEditAsset(asset: IAsset): void {
    this.edit.emit(asset);
  }

  onDeleteAsset(asset: IAsset): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Delete the asset?",
          message: `"${asset.name}" will be permanently deleted`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(asset.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

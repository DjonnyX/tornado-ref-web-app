import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IAsset } from '@models';
import { getThumbnail } from '@app/utils/asset.util';
import { MatDialog } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { BaseComponent } from '@components/base/base-component';

@Component({
  selector: 'ta-assets-uploader',
  templateUrl: './assets-uploader.component.html',
  styleUrls: ['./assets-uploader.component.scss']
})
export class AssetsUploaderComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IAsset>;

  @Output() upload = new EventEmitter<File>();

  @Output() update = new EventEmitter<IAsset>();

  @Output() delete = new EventEmitter<IAsset>();

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getThumbnail(asset: IAsset): string {
    return getThumbnail(asset);
  }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onUploadFile(file: File): void {
    this.upload.emit(file);
  }

  onDeleteAsset(asset: IAsset): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить ресурс?",
          message: `"${asset.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(asset);
      }
    });
  }

  onToggleActive(event: Event, asset: IAsset): void {
    if (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    this.update.emit({ ...asset, active: !asset.active });
  }
}

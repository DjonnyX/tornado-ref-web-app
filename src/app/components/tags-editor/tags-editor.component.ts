import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { IRef } from '@app/models/ref.model';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag } from '@models';

@Component({
  selector: 'ta-tags-editor-component',
  templateUrl: './tags-editor.component.html',
  styleUrls: ['./tags-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ITag>;

  @Input() refInfo: IRef;

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ITag>();

  @Output() delete = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  formatLastUpdate(): string {
    return moment(this.refInfo.lastUpdate).format("DD MM YYYY hh:mm:ss");
  }

  onShowMenu($event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onCreateTag(): void {
    this.create.emit();
  }

  onEditTag(tag: ITag): void {
    this.edit.emit(tag);
  }

  onDeleteTag(tag: ITag): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          entity: tag,
          entityType: "tag",
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(tag.id);
      }
    });
  }
}

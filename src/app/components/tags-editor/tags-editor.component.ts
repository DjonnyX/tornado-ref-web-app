import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-tags-editor-component',
  templateUrl: './tags-editor.component.html',
  styleUrls: ['./tags-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ITag>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ITag>();

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
          title: "Delete the tag?",
          message: `"${tag.name}" will be permanently deleted`,
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

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

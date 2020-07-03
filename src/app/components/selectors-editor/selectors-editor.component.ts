import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { IRef } from '@app/models/ref.model';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, ISelector } from '@models';

@Component({
  selector: 'ta-selectors-editor-component',
  templateUrl: './selectors-editor.component.html',
  styleUrls: ['./selectors-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ISelector>;

  @Input() refInfo: IRef;

  @Input() tagList: Array<ITag>;

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ISelector>();

  @Output() delete = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getTagColor(id: string): string {
    const tag = this.tagList.find(t => t.id === id);
    return !!tag ? tag.color : "";
  }

  getTagName(id: string): string {
    const tag = this.tagList.find(t => t.id === id);
    return !!tag ? tag.name : "";
  }

  formatLastUpdate(): string {
    return moment(this.refInfo.lastUpdate).format("DD MM YYYY hh:mm:ss");
  }

  onShowMenu($event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onCreateSelector(): void {
    this.create.emit();
  }

  onEditSelector(selector: ISelector): void {
    this.edit.emit(selector);
  }

  onDeleteSelector(selector: ISelector): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          entity: selector,
          entityType: "selector",
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(selector.id);
      }
    });
  }
}

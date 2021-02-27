import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ICheckue, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-checkues-editor-component',
  templateUrl: './checkues-editor.component.html',
  styleUrls: ['./checkues-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckuesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ICheckue>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ICheckue>();

  @Output() update = new EventEmitter<ICheckue>();

  @Output() updateAll = new EventEmitter<ICheckue>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onToggleActive(event: Event, checkue: ICheckue): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...checkue, active: !checkue.active });
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(checkue: ICheckue): void {
    this.edit.emit(checkue);
  }

  onDelete(checkue: ICheckue): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить валюту?",
          message: `"${checkue.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(checkue.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

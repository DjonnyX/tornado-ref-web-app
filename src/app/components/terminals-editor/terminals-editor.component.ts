import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITerminal, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-terminals-editor-component',
  templateUrl: './terminals-editor.component.html',
  styleUrls: ['./terminals-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ITerminal>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ITerminal>();

  @Output() update = new EventEmitter<ITerminal>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onToggleActive(event: Event, terminal: ITerminal): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit(terminal);
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(terminal: ITerminal): void {
    this.edit.emit(terminal);
  }

  onDelete(terminal: ITerminal): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить валюту?",
          message: `"${terminal.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(terminal.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

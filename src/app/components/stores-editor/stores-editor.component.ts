import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IStore, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-stores-editor-component',
  templateUrl: './stores-editor.component.html',
  styleUrls: ['./stores-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IStore>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IStore>();

  @Output() update = new EventEmitter<IStore>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onToggleActive(event: Event, store: IStore): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...store, active: !store.active });
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(store: IStore): void {
    this.edit.emit(store);
  }

  onDelete(store: IStore): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить валюту?",
          message: `"${store.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(store.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

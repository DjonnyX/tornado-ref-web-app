import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ICurrency, IRef, UserRights } from '@djonnyx/tornado-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'ta-currencies-editor-component',
  templateUrl: './currencies-editor.component.html',
  styleUrls: ['./currencies-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ICurrency>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Input() rights: Array<UserRights>;

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ICurrency>();

  @Output() update = new EventEmitter<ICurrency>();

  @Output() updateAll = new EventEmitter<ICurrency>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onToggleActive(event: Event, currency: ICurrency): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...currency, active: !currency.active });
  }

  onToggleDefault(event: Event, currency: ICurrency): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.updateAll.emit({ ...currency, isDefault: !currency.isDefault });
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(currency: ICurrency): void {
    this.edit.emit(currency);
  }

  onDelete(currency: ICurrency): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить валюту?",
          message: `"${currency.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(currency.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  hasCreate() {
    return this.rights.indexOf(UserRights.CREATE_CURRENCY) > -1;
  }

  hasDelete() {
    return this.rights.indexOf(UserRights.DELETE_CURRENCY) > -1;
  }
}

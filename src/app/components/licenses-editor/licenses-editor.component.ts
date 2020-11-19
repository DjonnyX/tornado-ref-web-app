import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ILicense, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-licenses-editor-component',
  templateUrl: './licenses-editor.component.html',
  styleUrls: ['./licenses-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicensesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ILicense>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ILicense>();

  @Output() update = new EventEmitter<ILicense>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onToggleActive(event: Event, license: ILicense): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit(license);
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(license: ILicense): void {
    this.edit.emit(license);
  }

  onDelete(license: ILicense): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить валюту?",
          message: `"${license.key}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(license.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

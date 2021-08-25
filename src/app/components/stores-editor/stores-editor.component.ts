import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IStore, IRef, UserRights } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

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

  @Input() rights: Array<UserRights>;

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IStore>();

  @Output() update = new EventEmitter<IStore>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public readonly dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
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
          title: "stores_dialog-delete-the-store",
          message: `#{"${store.name}" }common_action-will-be-permanently-deleted.`,
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

  hasCreate() {
    return this.rights.indexOf(UserRights.CREATE_STORE) > -1;
  }

  hasDelete() {
    return this.rights.indexOf(UserRights.DELETE_STORE) > -1;
  }
}

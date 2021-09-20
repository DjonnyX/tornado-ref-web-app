import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAccount, IRef } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-accounts-editor-component',
  templateUrl: './accounts-editor.component.html',
  styleUrls: ['./accounts-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IAccount>;

  private _accountsMap: { [id: string]: IAccount } = {};

  get accountsMap() {
    return this._accountsMap;
  }

  private _accounts: Array<IAccount>;
  @Input() set accounts(v: Array<IAccount>) {
    if (this._accounts !== v) {
      this._accounts = v;

      this._accountsMap = {};

      if (this._accounts) {
        this._accounts.forEach(int => {
          this._accountsMap[int.id] = int;
        });
      }
    }
  }

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IAccount>();

  @Output() view = new EventEmitter<IAccount>();

  @Output() update = new EventEmitter<IAccount>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  hasDelete() {
    return true;
  }

  onToggleActive(event: Event, account: IAccount): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit(account);
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(account: IAccount): void {
    this.edit.emit(account);
  }

  onView(account: IAccount): void {
    this.view.emit(account);
  }

  onDelete(account: IAccount): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-account",
          message: `#{"${account.email} (${account.firstName} ${account.lastName})" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(account.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

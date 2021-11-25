import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAccount, IIntegration, ISubscription, IRef } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';
import { SubscriptionStatuses } from '@djonnyx/tornado-types/dist/enums/SubscriptionStatuses';

@Component({
  selector: 'ta-subscriptions-editor-component',
  templateUrl: './subscriptions-editor.component.html',
  styleUrls: ['./subscriptions-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ISubscription>;

  private _integrations: Array<IIntegration>;
  @Input() set integrations(v: Array<IIntegration>) {
    if (this._integrations !== v) {
      this._integrations = v;
    }
  }

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

  @Output() edit = new EventEmitter<ISubscription>();

  @Output() view = new EventEmitter<ISubscription>();

  @Output() update = new EventEmitter<ISubscription>();

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

  onToggleActive(event: Event, subscription: ISubscription): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit(subscription);
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(subscription: ISubscription): void {
    this.edit.emit(subscription);
  }

  onView(subscription: ISubscription): void {
    this.view.emit(subscription);
  }

  onDelete(subscription: ISubscription): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-subscription",
          message: `#{"${subscription.id}" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(subscription.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  isSubscriptionDisabled(subscription: ISubscription): boolean {
    return subscription.status !== SubscriptionStatuses.ACTIVATED;
  }
}

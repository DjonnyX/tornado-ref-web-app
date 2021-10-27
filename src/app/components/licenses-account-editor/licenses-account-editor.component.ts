import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalizationService } from '@app/services/localization/localization.service';
import { BaseComponent } from '@components/base/base-component';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { IAccount, IIntegration, ILicenseAccount, IRef, LicenseStates } from '@djonnyx/tornado-types';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ta-licenses-account-editor-component',
  templateUrl: './licenses-account-editor.component.html',
  styleUrls: ['./licenses-account-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicensesAccountEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ILicenseAccount>;

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

  @Output() view = new EventEmitter<ILicenseAccount>();

  @Output() unbind = new EventEmitter<string>();

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

  onView(license: ILicenseAccount): void {
    this.view.emit(license);
  }

  onUnbind(license: ILicenseAccount): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-attention",
          message: "common_dialog-message-are-you-sure-you-want-to-remove-the-license-from-the-device",
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.unbind.emit(license.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  isLicenseDisabled(license: ILicenseAccount): boolean {
    return license.state === LicenseStates.DEACTIVE || license.state === LicenseStates.NOT_ACTIVE;
  }
}

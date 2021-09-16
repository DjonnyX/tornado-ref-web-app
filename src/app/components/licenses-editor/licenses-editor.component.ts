import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAccount, IIntegration, ILicense, IRef, LicenseStates } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-licenses-editor-component',
  templateUrl: './licenses-editor.component.html',
  styleUrls: ['./licenses-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicensesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ILicense>;

  private _integrationsMap: { [id: string]: IIntegration } = {};

  get integrationsMap() {
    return this._integrationsMap;
  }

  private _integrations: Array<IIntegration>;
  @Input() set integrations(v: Array<IIntegration>) {
    if (this._integrations !== v) {
      this._integrations = v;

      this._integrationsMap = {};

      if (this._integrations) {
        this._integrations.forEach(int => {
          this._integrationsMap[int.id] = int;
        });
      }
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

  @Output() edit = new EventEmitter<ILicense>();

  @Output() view = new EventEmitter<ILicense>();

  @Output() update = new EventEmitter<ILicense>();

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

  onView(license: ILicense): void {
    this.view.emit(license);
  }

  onDelete(license: ILicense): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-license",
          message: `#{"${license.key}" }common_action-will-be-permanently-deleted.`,
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

  isLicenseDisabled(license: ILicense): boolean {
    return license.state === LicenseStates.DEACTIVE || license.state === LicenseStates.NOT_ACTIVE;
  }
}

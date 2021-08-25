import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IIntegration, IRef, IAsset, IntegrationStates } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-integrations-editor-component',
  templateUrl: './integrations-editor.component.html',
  styleUrls: ['./integrations-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IIntegration>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  /*private _assetsDictionary: { [id: string]: IAsset } = {};

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;

      this._assets.forEach(asset => {
        this._assetsDictionary[asset.id] = asset;
      });
    }
  }

  get assets() { return this._assets; }*/

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IIntegration>();

  @Output() update = new EventEmitter<IIntegration>();

  @Output() updateAll = new EventEmitter<IIntegration>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(integration: IIntegration): void {
    this.edit.emit(integration);
  }

  onDelete(integration: IIntegration): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-integration",
          message: `#{"${integration.name}" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(integration.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  onToggleActive(event: Event, integration: IIntegration): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({
      ...integration, state: integration.state === IntegrationStates.INACTIVE
        ? IntegrationStates.ACTIVE : IntegrationStates.INACTIVE
    });
  }

  isIntegrationDisabled(integration: IIntegration): boolean {
    return integration.state === IntegrationStates.INACTIVE;
  }
}

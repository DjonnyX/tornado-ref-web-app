import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IRole, IRef, DefaultRoleTypes } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-roles-editor-component',
  templateUrl: './roles-editor.component.html',
  styleUrls: ['./roles-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IRole>;

  private _rolesMap: { [id: string]: IRole } = {};

  get rolesMap() {
    return this._rolesMap;
  }

  private _roles: Array<IRole>;
  @Input() set roles(v: Array<IRole>) {
    if (this._roles !== v) {
      this._roles = v;

      this._rolesMap = {};

      if (this._roles) {
        this._roles.forEach(int => {
          this._rolesMap[int.id] = int;
        });
      }
    }
  }

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IRole>();

  @Output() view = new EventEmitter<IRole>();

  @Output() update = new EventEmitter<IRole>();

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

  getIsReadonly(role: IRole): boolean {
    if (!!role &&
      ([DefaultRoleTypes.OWNER, DefaultRoleTypes.EMPLOYEE] as Array<string>).indexOf(role.name) > -1) {
      return true;
    }

    return false;
  }

  onToggleActive(event: Event, role: IRole): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit(role);
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(role: IRole): void {
    this.edit.emit(role);
  }

  onView(role: IRole): void {
    this.view.emit(role);
  }

  onDelete(role: IRole): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-role",
          message: `#{"${role.name})" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(role.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

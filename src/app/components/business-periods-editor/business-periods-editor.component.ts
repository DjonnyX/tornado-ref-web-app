import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IBusinessPeriod, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-business-periods-editor-component',
  templateUrl: './business-periods-editor.component.html',
  styleUrls: ['./business-periods-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessPeriodsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IBusinessPeriod>;

  @Input() refInfo: IRef;

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IBusinessPeriod>();

  @Output() update = new EventEmitter<IBusinessPeriod>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onShowMenu($event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onToggleActive(event: Event, businessPeriod: IBusinessPeriod): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...businessPeriod, active: !businessPeriod.active });
  }

  onCreateBusinessPeriod(): void {
    this.create.emit();
  }

  onEditBusinessPeriod(businessPeriod: IBusinessPeriod): void {
    this.edit.emit(businessPeriod);
  }

  onDeleteBusinessPeriod(businessPeriod: IBusinessPeriod): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Delete the business period?",
          message: `"${businessPeriod.name}" will be permanently deleted`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(businessPeriod.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

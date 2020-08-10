import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IOrderType, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-order-types-editor-component',
  templateUrl: './order-types-editor.component.html',
  styleUrls: ['./order-types-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypesEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IOrderType>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IOrderType>();

  @Output() update = new EventEmitter<IOrderType>();

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

  onCreate(): void {
    this.create.emit();
  }

  onEdit(orderType: IOrderType): void {
    this.edit.emit(orderType);
  }

  onDelete(orderType: IOrderType): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Delete the orderType?",
          message: `"${orderType.name}" will be permanently deleted`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(orderType.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}

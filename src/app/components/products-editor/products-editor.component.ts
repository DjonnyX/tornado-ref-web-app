import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { IProduct } from '@app/models/product.model';
import { IRef } from '@app/models/ref.model';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag } from '@models';

@Component({
  selector: 'ta-products-editor-component',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IProduct>;

  @Input() refInfo: IRef;

  @Input() tagList: Array<ITag>;

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IProduct>();

  @Output() delete = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getTagColor(id: string): string {
    const tag = this.tagList.find(t => t.id === id);
    return !!tag ? tag.color : "";
  }

  getTagName(id: string): string {
    const tag = this.tagList.find(t => t.id === id);
    return !!tag ? tag.name : "";
  }

  formatLastUpdate(): string {
    return moment(this.refInfo.lastUpdate).format("DD MM YYYY hh:mm:ss");
  }

  onShowMenu($event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onCreateProduct(): void {
    this.create.emit();
  }

  onEditProduct(product: IProduct): void {
    this.edit.emit(product);
  }

  onDeleteProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          entity: product,
          entityType: "product",
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(product.id);
      }
    });
  }
}

import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { IProduct } from '@app/models/product.model';
import { IRef } from '@app/models/ref.model';
import { DeleteProductDialogComponent } from '@components/dialogs/delete-product-dialog/delete-product-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';

@Component({
  selector: 'ta-products-editor-component',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IProduct>;

  @Input() refInfo: IRef;

  @Output() create = new EventEmitter<IProduct>();

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

  formatLastUpdate(): string {
    return moment(this.refInfo.lastUpdate).format("DD MM YYYY hh:mm:ss");
  }

  onCreateProduct(): void {
    this.create.emit({
      name: "Большое блюдо с розмарином из крокодиловой кожи",
      description: "sdfsdfeggrsdr",
      tags: [],
      receipt: [],
    })
  }

  onShowMenu($event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onEditProduct(product: IProduct): void {
    this.edit.emit(product);
  }

  onDeleteProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent,
      {
        data: {
          entity: product,
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

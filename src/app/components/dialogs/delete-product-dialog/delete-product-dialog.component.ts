import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEntity } from '@models';

interface IDialogData {
  entity: IEntity;
}

@Component({
  selector: 'ta-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {
  }

}

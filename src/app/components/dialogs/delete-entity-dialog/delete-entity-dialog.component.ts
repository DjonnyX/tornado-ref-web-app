import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEntity } from '@models';

interface IDialogData {
  entity: IEntity;
  entityType: string;
}

@Component({
  selector: 'ta-delete-entity-dialog',
  templateUrl: './delete-entity-dialog.component.html',
  styleUrls: ['./delete-entity-dialog.component.scss']
})
export class DeleteEntityDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {
  }

}

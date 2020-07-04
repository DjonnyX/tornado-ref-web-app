import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct, ISelector, IEntity } from '@models';

interface IDialogData {
  title: string;
  products: Array<IProduct>;
  selectors: Array<ISelector>;
}

@Component({
  selector: 'ta-setup-node-content-dialog',
  templateUrl: './setup-node-content-dialog.component.html',
  styleUrls: ['./setup-node-content-dialog.component.scss']
})
export class SetupNodeContentDialogComponent implements OnInit {

  content: IEntity;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {
  }

  onChange(content: IEntity): void {
    this.content = content;
  }
}

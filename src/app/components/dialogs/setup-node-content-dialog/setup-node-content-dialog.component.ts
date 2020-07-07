import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct, ISelector, IEntity, INode } from '@models';
import { SelectContentFormModes } from '@components/forms/select-content-form/enums/select-content-form-modes.enum';
import { NodeTypes } from '@app/enums/node-types.enum';

interface IDialogData {
  title: string;
  nodes: Array<INode>;
  products: Array<IProduct>;
  selectors: Array<ISelector>;
  selectorsDictionary: { [id: string]: ISelector };
  defaultCollection: NodeTypes;
  mode: SelectContentFormModes;
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

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectContentFormRights } from '@components/forms/select-content-form/enums/select-content-form-modes.enum';
import { ISelector, IProduct, INode, IEntity, NodeTypes, IAsset, ILanguage } from '@djonnyx/tornado-types';

interface IDialogData {
  title: string;
  nodes: Array<INode>;
  products: Array<IProduct>;
  selectors: Array<ISelector>;
  selectorsDictionary: { [id: string]: ISelector };
  schemaSelectors: Array<ISelector>;
  assetsDictionary: { [id: string]: IAsset };
  selectedDefaultEntityId: string;
  defaultCollection: NodeTypes;
  languages: Array<ILanguage>,
  defaultLanguage: ILanguage,
  rights: Array<SelectContentFormRights>;
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

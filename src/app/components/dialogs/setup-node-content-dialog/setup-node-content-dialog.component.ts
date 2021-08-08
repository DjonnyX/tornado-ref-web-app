import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalizationService } from '@app/services/localization/localization.service';
import { SelectContentFormModes } from '@components/forms/select-content-form/enums/select-content-form-modes.enum';
import { NodeTreeModes } from '@components/node-tree/enums/node-tree-modes.enum';
import { ISelector, IProduct, INode, IEntity, NodeTypes, IAsset, ILanguage } from '@djonnyx/tornado-types';

interface IDialogData {
  title: string;
  multi?: boolean;
  nodes: Array<INode>;
  groupModifiersNodes: Array<INode>;
  groupMenuNodes: Array<INode>;
  products: Array<IProduct>;
  selectors: Array<ISelector>;
  selectorsDictionary: { [id: string]: ISelector };
  schemaSelectors: Array<ISelector>;
  assetsDictionary: { [id: string]: IAsset };
  selectedDefaultEntityId: string;
  defaultCollection: NodeTypes;
  languages: Array<ILanguage>,
  defaultLanguage: ILanguage,
  depth: number;
  mode: NodeTreeModes | SelectContentFormModes;
}

@Component({
  selector: 'ta-setup-node-content-dialog',
  templateUrl: './setup-node-content-dialog.component.html',
  styleUrls: ['./setup-node-content-dialog.component.scss']
})
export class SetupNodeContentDialogComponent<C = any> implements OnInit {

  content: C;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void {
  }

  onChange(content: C): void {
    this.content = content;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {
  IScenario, IBusinessPeriod, ICurrency, ILanguage, IProduct, ISelector,
  IStore, IOrderType
} from '@djonnyx/tornado-types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeScenarioTypes } from '@enums/node-scenario-types';
import { ICollectionDictionary } from '@app/utils/collection.util';

interface IDialogData {
  type: NodeScenarioTypes;
  title: string;
  message: string;
  scenario: IScenario;
  businessPeriods: Array<IBusinessPeriod>;
  businessPeriodsDictionary: ICollectionDictionary<IBusinessPeriod>;
  currencies: Array<ICurrency>;
  currenciesDictionary: ICollectionDictionary<ICurrency>;
  languages: Array<ILanguage>;
  languagesDictionary: ICollectionDictionary<ILanguage>;
  products: Array<IProduct>;
  productsDictionary: ICollectionDictionary<IProduct>;
  selectors: Array<ISelector>;
  selectorsDictionary: ICollectionDictionary<ISelector>;
  orderTypes: Array<IOrderType>;
  orderTypesDictionary: ICollectionDictionary<IOrderType>;
  stores: Array<IStore>;
  storesDictionary: ICollectionDictionary<IStore>;
  defaultLanguage: ILanguage;
}

@Component({
  selector: 'ta-edit-scenario-dialog',
  templateUrl: './edit-scenario-dialog.component.html',
  styleUrls: ['./edit-scenario-dialog.component.scss']
})
export class EditScenarioDialogComponent implements OnInit {

  content: IScenario;

  replacedScenario: IScenario;

  status = "INVALID";

  get result() {
    return {
      content: this.content,
      replacedScenario: this.replacedScenario,
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void { }

  onChangeScenario(scenario: IScenario): void {
    if (this.data.scenario) {
      this.replacedScenario = this.data.scenario;
      this.content = scenario;
    } else {
      this.content = scenario;
    }
  }

  onChangeStatus(status: string): void {
    this.status = status;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ICurrency, ILanguage, IBusinessPeriod, ISelector, IProduct, IOrderType } from '@djonnyx/tornado-types';
import { ICollectionDictionary } from '@app/utils/collection.util';

@Component({
  selector: 'ta-expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: ['./expression-editor.component.scss']
})
export class ExpressionEditorComponent implements OnInit {

  @Input() languages: Array<ILanguage>;

  @Input() languagesDictionary: ICollectionDictionary<ILanguage>;

  @Input() orderTypes: Array<IOrderType>;

  @Input() orderTypesDictionary: ICollectionDictionary<IOrderType>;

  @Input() defaultLanguage: ILanguage;

  @Input() currencies: Array<ICurrency>;

  @Input() currenciesDictionary: ICollectionDictionary<ICurrency>;

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Input() businessPeriodsDictionary: ICollectionDictionary<IBusinessPeriod>;

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: ICollectionDictionary<ISelector>;

  @Input() products: Array<IProduct>;

  @Input() productsDictionary: ICollectionDictionary<IProduct>;

  constructor() { }

  ngOnInit(): void {
  }

}

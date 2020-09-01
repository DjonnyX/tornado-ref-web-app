import { Component, OnInit, Input } from '@angular/core';
import { ICurrency, ILanguage, IBusinessPeriod, ISelector, IProduct } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: ['./expression-editor.component.scss']
})
export class ExpressionEditorComponent implements OnInit {

  @Input() languages: Array<ILanguage>;

  @Input() defaultLanguage: ILanguage;

  @Input() currencies: Array<ICurrency>;

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Input() selectors: Array<ISelector>;

  @Input() products: Array<IProduct>;

  constructor() { }

  ngOnInit(): void {
  }

}

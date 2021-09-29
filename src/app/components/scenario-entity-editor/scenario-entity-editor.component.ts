import {
  Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { take, takeUntil, map, filter } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  INode, IProduct, ISelector, IScenario, IBusinessPeriod, ICurrency,
  ILanguage, IOrderType, IStore
} from '@djonnyx/tornado-types';
import { EditScenarioDialogComponent } from '@components/dialogs/edit-scenario-dialog/edit-scenario-dialog.component';
import { NodeScenarioTypes } from '@enums/node-scenario-types';
import { getMapOfCollection, ICollectionDictionary } from '@app/utils/collection.util';
import { IScenarioEntity } from './interfaces';

@Component({
  selector: 'ta-scenario-entity-editor',
  templateUrl: './scenario-entity-editor.component.html',
  styleUrls: ['./scenario-entity-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenarioEntityEditorComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild("checkboxActive", { read: MatCheckbox }) private _checkboxActive: MatCheckbox;

  private _currencies: Array<ICurrency>;

  @Input() set currencies(v: Array<ICurrency>) {
    if (this._currencies !== v) {
      this._currencies = v;
      this.currenciesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get currencies() {
    return this._currencies;
  }

  currenciesDictionary: ICollectionDictionary<ICurrency>;

  private _stores: Array<IStore>;
  @Input() set stores(v: Array<IStore>) {
    if (this._stores !== v) {
      this._stores = v;
      this.storesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get stores() {
    return this._stores;
  }

  storesDictionary: ICollectionDictionary<IStore>;

  private _selectors: Array<ISelector>;
  @Input() set selectors(v: Array<ISelector>) {
    if (this._selectors !== v) {
      this._selectors = v;
      this.selectorsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get selectors() {
    return this._selectors;
  }

  selectorsDictionary: ICollectionDictionary<ISelector>;

  private _products: Array<IProduct>;
  @Input() set products(v: Array<IProduct>) {
    if (this._products !== v) {
      this._products = v;
      this.productsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get products() {
    return this._products;
  }

  productsDictionary: ICollectionDictionary<IProduct>;

  private _businessPeriods: Array<IBusinessPeriod>;
  @Input() set businessPeriods(v: Array<IBusinessPeriod>) {
    if (this._businessPeriods !== v) {
      this._businessPeriods = v;
      this.businessPeriodsDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get businessPeriods() {
    return this._businessPeriods;
  }

  businessPeriodsDictionary: ICollectionDictionary<IBusinessPeriod>;

  private _languages: Array<ILanguage>;

  @Input() set languages(v: Array<ILanguage>) {
    if (this._languages !== v) {
      this._languages = v;
      this.languagesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get languages() {
    return this._languages;
  }

  languagesDictionary: ICollectionDictionary<ILanguage>;

  @Input() defaultLanguage: ILanguage;

  private _orderTypes: Array<IOrderType>;
  @Input() set orderTypes(v: Array<IOrderType>) {
    if (this._orderTypes !== v) {
      this._orderTypes = v;
      this.orderTypesDictionary = !!v ? getMapOfCollection(v, "id") : {};
    }
  }
  get orderTypes() {
    return this._orderTypes;
  }

  orderTypesDictionary: ICollectionDictionary<IOrderType>;

  @Output() update = new EventEmitter<IScenarioEntity>();

  @Input() type: NodeScenarioTypes = NodeScenarioTypes.CHECKUE;

  private _entity: IScenarioEntity;
  @Input() set entity(v: IScenarioEntity) {
    if (this._entity !== v) {
      this._entity = v;
    }
  }
  get entity() { return this._entity; }

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onToggleActive(event?: Event): void {
    if (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    this.update.emit({
      ...this._entity,
      scenarios: [...this._entity.scenarios],
      active: !this._entity.active
    });
  }

  onAddScenario(): void {
    const dialogRef = this.dialog.open(EditScenarioDialogComponent,
      {
        data: {
          type: this.type,
          title: "Настроить сценарий",
          scenario: undefined,
          scenarios: this.entity.scenarios,
          businessPeriods: this.businessPeriods,
          businessPeriodsDictionary: this.businessPeriodsDictionary,
          orderTypes: this.orderTypes,
          orderTypesDictionary: this.orderTypesDictionary,
          currencies: this.currencies,
          currenciesDictionary: this.currenciesDictionary,
          languages: this.languages,
          languagesDictionary: this.languagesDictionary,
          products: this.products,
          productsDictionary: this.productsDictionary,
          selectors: this.selectors,
          selectorsDictionary: this.selectorsDictionary,
          stores: this.stores,
          defaultLanguage: this.defaultLanguage,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      filter(v => !!v),
      map(v => v as { content: IScenario, replacedScenario: IScenario }),
    ).subscribe(({ content, replacedScenario }) => {
      if (!!content) {
        const scenario: IScenario = {
          active: true,
          lock: false,
          action: content.action,
          value: content.value,
          extra: content.extra,
        };
        this.update.emit({ ...this._entity, scenarios: [...this.entity.scenarios, scenario] });
      }
    });
  }

  onDeleteScenarios(): void {
    this.update.emit({ ...this._entity, scenarios: [] });
  }

  onDeleteScenario(scenario: IScenario): void {
    const scenarios = [...this._entity.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1) {
      scenarios.splice(index, 1);
    }

    this.update.emit({ ...this._entity, scenarios });
  }

  onUpdateScenario(scenarios: Array<IScenario>): void {
    this.update.emit({ ...this._entity, scenarios });
  }

  onEditScenario(scenario: IScenario): void {

    const dialogRef = this.dialog.open(EditScenarioDialogComponent,
      {
        data: {
          type: this.type,
          title: "Редактировать сценарий",
          scenario: scenario,
          scenarios: this._entity.scenarios,
          stores: this.stores,
          businessPeriods: this.businessPeriods,
          currencies: this.currencies,
          languages: this.languages,
          defaultLanguage: this.defaultLanguage,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      filter(v => !!v),
      map(v => v as { content: IScenario, replacedScenario: IScenario }),
    ).subscribe(({ content, replacedScenario }) => {
      if (!!content) {
        const scenarios = [...this._entity.scenarios];
        const index = scenarios.indexOf(replacedScenario);

        if (index > -1) {
          scenarios[index] = content;
        }

        this.update.emit({ ...this._entity, scenarios });
      }
    });
  }

  onUpwardScenario(scenario: IScenario): void {
    const scenarios = [...this._entity.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1 && index > 0) {
      scenarios.splice(index, 1);
      scenarios.splice(index - 1, 0, scenario);
    }

    this.update.emit({ ...this._entity, scenarios });
  }

  onDownwardScenario(scenario: IScenario): void {
    const scenarios = [...this._entity.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1 && index < scenarios.length - 1) {
      scenarios.splice(index, 1);
      scenarios.splice(index + 1, 0, scenario);
    }

    this.update.emit({ ...this._entity, scenarios });
  }
}

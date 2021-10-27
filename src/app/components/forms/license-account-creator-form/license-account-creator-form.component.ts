import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '@components/base/base-component';
import { IIntegration, ILicenseAccount, ITarif, IAccount, LicenseStates, ITerminal, IStore } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import moment from 'moment';

interface ISelectOption extends Array<{ name: string, value: number | string, link?: string }> { }

const LICENSE_STATES: ISelectOption = [
  {
    name: "Неактивный",
    value: LicenseStates.NOT_ACTIVE,
  },
  {
    name: "Деактивированный",
    value: LicenseStates.DEACTIVE,
  },
  {
    name: "Активный",
    value: LicenseStates.ACTIVE,
  },
];

interface IData {
  applicationName: IKeyValue;
  tarifName: IKeyValue;
  trialPeriod: IKeyValue;
  dateEnd: IKeyValue;
  dateStart: IKeyValue;
  key: IKeyValue;
  price: IKeyValue;
  state: IKeyValue;
  integration: IKeyValue;
  integrationVersion: IKeyValue;
  terminalName: IKeyValue;
  terminalStoreName: IKeyValue;
  terminalStoreAddress: IKeyValue;
}

@Component({
  selector: 'ta-license-account-creator-form',
  templateUrl: './license-account-creator-form.component.html',
  styleUrls: ['./license-account-creator-form.component.scss']
})
export class LicenseAccountCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public get licenseStates() {
    return LICENSE_STATES;
  }

  @Input() tarifs: Array<ITarif>;

  @Input() accounts: Array<IAccount>;

  private _terminal: ITerminal;
  @Input() set terminal(v: ITerminal) {
    if (this._terminal !== v) {
      this._terminal = v;

      this.generateData();
    }
  }

  private _store: IStore;
  @Input() set store(v: IStore) {
    if (this._store !== v) {
      this._store = v;

      this.generateData();
    }
  }

  private _integrations: Array<IIntegration>;
  @Input() set integrations(v: Array<IIntegration>) {
    if (this._integrations !== v) {
      this._integrations = v;

      this.generateData();
    }
  }

  private _license: ILicenseAccount;
  @Input() set license(license: ILicenseAccount) {
    if (license !== this._license) {
      this._license = license;

      this.generateData();
    }
  }

  get license() { return this._license; }

  private _data: IData;

  get data() {
    return this._data;
  }

  @Output() cancel = new EventEmitter<void>();

  constructor() {
    super();
  }

  private generateData(): void {

    this._data = {
      applicationName: {
        key: "Приложение",
        value: this._license?.tarif?.application?.name || ' ---',
      },
      tarifName: {
        key: "Тариф",
        value: this._license?.tarif?.name || ' ---',
      },
      trialPeriod: {
        key: "Бесплатный период",
        value: `${this._license?.tarif?.trialPeriodDuration} дней` || ' ---',
      },
      price: {
        key: "Цена",
        value: (this._license?.tarif?.costByDevices?.map(v => `${(v.cost * 0.01).toFixed(2)} за ${v.largeOrEqual} и более устройств`)) || ' ---',
      },
      dateStart: {
        key: "Время начала лицензионного периода",
        value: this._license ? moment(this._license?.dateStart).format("DD-MM-YYYY") : ' ---',
      },
      dateEnd: {
        key: "Время завершения лицензионного периода",
        value: this._license ? moment(this._license?.dateEnd).format("DD-MM-YYYY") : ' ---',
      },
      key: {
        key: "Лицензионный ключ",
        value: this._license?.key || ' ---',
      },
      state: {
        key: "Статус",
        value: String(this._license?.state) || ' ---',
      },
      integration: {
        key: "Название",
        value: this._license?.tarif?.integration?.name || ' ---',
      },
      integrationVersion: {
        key: "Версия интеграции",
        value: this._license?.tarif?.integration?.version?.version || ' ---',
      },
      terminalName: {
        key: "Название терминала",
        value: this._terminal?.name || ' ---',
        link: this._terminal ? ["/admin/terminals/edit", { id: this._license?.terminalId }] : undefined,
      },
      terminalStoreName: {
        key: "Название магазина",
        value: this._store?.name || ' ---',
      },
      terminalStoreAddress: {
        key: "Адрес магазина",
        value: this._store?.address || ' ---',
      },
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  isBindToTerminal(): boolean {
    return !!this._terminal;
  }
}

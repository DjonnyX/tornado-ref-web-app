import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '@components/base/base-component';
import { IIntegration, ILicenseAccount, ILicenseType, IAccount, LicenseStatuses, LicenseStates } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import moment from 'moment';

interface ISelectOption extends Array<{ name: string, value: number | string }> { }

const LICENSE_STATUSES: ISelectOption = [
  {
    name: "Новый",
    value: LicenseStatuses.NEW,
  },
  {
    name: "Дэмо",
    value: LicenseStatuses.DEMO,
  },
  {
    name: "Активный",
    value: LicenseStatuses.ACTIVE,
  },
  {
    name: "Деактивированный",
    value: LicenseStatuses.DEACTIVE,
  },
];

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
  name: IKeyValue;
  dateEnd: IKeyValue;
  dateStart: IKeyValue;
  key: IKeyValue;
  price: IKeyValue;
  state: IKeyValue;
  status: IKeyValue;
  integration: IKeyValue;
  integrationDescription: IKeyValue;
  integrationVersion: IKeyValue;
}

@Component({
  selector: 'ta-license-account-creator-form',
  templateUrl: './license-account-creator-form.component.html',
  styleUrls: ['./license-account-creator-form.component.scss']
})
export class LicenseAccountCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public get licenseStatuses() {
    return LICENSE_STATUSES;
  }

  public get licenseStates() {
    return LICENSE_STATES;
  }

  @Input() licenseTypes: Array<ILicenseType>;

  @Input() accounts: Array<IAccount>;

  private _integrationsMap: { [id: string]: IIntegration };

  get integrationsMap() {
    return this._integrationsMap;
  }

  private _integrations: Array<IIntegration>;
  @Input() set integrations(v: Array<IIntegration>) {
    if (this._integrations !== v) {
      this._integrations = v;

      this._integrationsMap = {};

      if (this._integrations) {
        this._integrations.forEach(int => {
          this._integrationsMap[int.id] = int;
        });
      }

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
      name: {
        key: "Название",
        value: this._license?.licType?.name,
      },
      price: {
        key: "Цена",
        value: (this._license?.licType?.price * 0.01).toFixed(2),
      },
      dateStart: {
        key: "Время начала лицензионного периода",
        value: moment(this._license?.dateStart).format("DD-MM-YYYY"),
      },
      dateEnd: {
        key: "Время завершения лицензионного периода",
        value: moment(this._license?.dateEnd).format("DD-MM-YYYY"),
      },
      key: {
        key: "Лицензионный ключ",
        value: this._license?.key,
      },
      state: {
        key: "Статус",
        value: String(this._license?.state),
      },
      status: {
        key: "Состояние",
        value: this._license?.status,
      },
      integration: {
        key: "Название",
        value: !!this._integrationsMap ? this._integrationsMap[this._license?.licType?.integrationId]?.name : '',
      },
      integrationDescription: {
        key: "Описание интеграции",
        value: !!this._integrationsMap ? this._integrationsMap[this._license?.licType?.integrationId]?.description : '',
      },
      integrationVersion: {
        key: "Версия интеграции",
        value: !!this._integrationsMap ? this._integrationsMap[this._license?.licType?.integrationId]?.version.version : '',
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
}

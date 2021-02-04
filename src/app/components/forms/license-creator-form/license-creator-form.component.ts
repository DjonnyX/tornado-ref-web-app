import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { IIntegration, ILicense, ILicenseType, IAccount, LicenseStatuses, LicenseStates, ITerminal, IStore, ILicenseAccount } from '@djonnyx/tornado-types';
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
  terminalName: IKeyValue;
  terminalStoreName: IKeyValue;
  terminalStoreAddress: IKeyValue;
}

@Component({
  selector: 'ta-license-creator-form',
  templateUrl: './license-creator-form.component.html',
  styleUrls: ['./license-creator-form.component.scss']
})
export class LicenseCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public get licenseStatuses() {
    return LICENSE_STATUSES;
  }

  public get licenseStates() {
    return LICENSE_STATES;
  }

  form: FormGroup;

  ctrlLicenseType = new FormControl('', [Validators.required]);

  ctrlDateStart = new FormControl(new Date());

  ctrlDateEnd = new FormControl(new Date(Date.now() + 8640000));

  ctrlAccount = new FormControl('', [Validators.required]);

  ctrlState = new FormControl('', [Validators.required]);

  ctrlStatus = new FormControl('', [Validators.required]);

  range = new FormGroup({
    start: this.ctrlDateStart,
    end: this.ctrlDateEnd,
  });

  @Input() licenseTypes: Array<ILicenseType>;

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

      this.ctrlAccount.setValue(license.clientId);
      this.ctrlLicenseType.setValue(license.licTypeId);
      this.ctrlDateStart.setValue(license.dateStart);
      this.ctrlDateEnd.setValue(license.dateEnd);
      this.ctrlStatus.setValue(license.status);
      this.ctrlState.setValue(license.state);
    }
  }

  get license() { return this._license; }

  private _data: IData;

  get data() {
    return this._data;
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ILicense>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ILicense>();

  isEdit = false;

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      clientId: this.ctrlAccount,
      licTypeId: this.ctrlLicenseType,
      dateStart: this.ctrlDateStart,
      dateEnd: this.ctrlDateEnd,
      status: this.ctrlStatus,
      state: this.ctrlState,
    });
  }

  private generateData(): void {
    if (!this._integrationsMap) {
      return;
    }

    this._data = {
      name: {
        key: "Название",
        value: this._license?.licType?.name || ' ---',
      },
      price: {
        key: "Цена",
        value: (this._license?.licType?.price * 0.01).toFixed(2) || ' ---',
      },
      dateStart: {
        key: "Время начала лицензионного периода",
        value: moment(this._license?.dateStart).format("DD-MM-YYYY") || ' ---',
      },
      dateEnd: {
        key: "Время завершения лицензионного периода",
        value: moment(this._license?.dateEnd).format("DD-MM-YYYY") || ' ---',
      },
      key: {
        key: "Лицензионный ключ",
        value: this._license?.key || ' ---',
      },
      state: {
        key: "Статус",
        value: String(this._license?.state) || ' ---',
      },
      status: {
        key: "Состояние",
        value: this._license?.status || ' ---',
      },
      integration: {
        key: "Название",
        value: !!this._integrationsMap ? this._integrationsMap[this._license?.licType?.integrationId]?.name : ' ---',
      },
      integrationDescription: {
        key: "Описание интеграции",
        value: !!this._integrationsMap ? this._integrationsMap[this._license?.licType?.integrationId]?.description : ' ---',
      },
      integrationVersion: {
        key: "Версия интеграции",
        value: !!this._integrationsMap ? this._integrationsMap[this._license?.licType?.integrationId]?.version.version : '',
      },
      terminalName: {
        key: "Название терминала",
        value: this._terminal?.name || ' ---',
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

      this.onSubmit();
    }
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onSubmit(): void {
    if (this.form.valid) {

      this.save.emit({
        ...this._license,
        ...this.form.value,
      });

      this.isEdit = false;
    }
  }

  onEditCancel(): void {
    this.isEdit = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }

  isBindToTerminal(): boolean {
    return !!this._terminal;
  }
}

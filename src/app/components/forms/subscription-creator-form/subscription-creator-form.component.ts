import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { IIntegration, ISubscription, ITarif, IAccount, ITerminal, IStore, ILicense } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import moment from 'moment';
import { SubscriptionStatuses } from '@djonnyx/tornado-types/dist/enums/SubscriptionStatuses';
import { formatTarifCostByDevices } from '@app/utils/tarif.util';

interface ISelectOption extends Array<{ name: string, value: number | string }> { }

const SUBSCRIPTION_STATUSES: ISelectOption = [
  {
    name: "Неактивный",
    value: SubscriptionStatuses.NOT_ACTIVATED,
  },
  {
    name: "Деактивированный",
    value: SubscriptionStatuses.DEACTIVATED,
  },
  {
    name: "Активный",
    value: SubscriptionStatuses.ACTIVATED,
  },
];

interface IData {
  applicationName: IKeyValue;
  tarifName: IKeyValue;
  trialPeriod: IKeyValue;
  dateEnd: IKeyValue;
  dateStart: IKeyValue;
  price: IKeyValue;
  state: IKeyValue;
  integration: IKeyValue;
  integrationVersion: IKeyValue;
  licenses: Array<{
    key: IKeyValue;
  }>;
}

@Component({
  selector: 'ta-subscription-creator-form',
  templateUrl: './subscription-creator-form.component.html',
  styleUrls: ['./subscription-creator-form.component.scss']
})
export class SubscriptionCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public get subscriptionStates() {
    return SUBSCRIPTION_STATUSES;
  }

  form: FormGroup;

  ctrlTarif = new FormControl('', [Validators.required]);

  ctrlDevices = new FormControl(1, [Validators.required]);

  ctrlAccount = new FormControl('', [Validators.required]);

  ctrlStatus = new FormControl('', [Validators.required]);

  @Input() tarifs: Array<ITarif>;

  @Input() accounts: Array<IAccount>;

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

  private _licenses: Array<ILicense>;
  @Input() set licenses(v: Array<ILicense>) {
    if (this._licenses !== v) {
      this._licenses = v;

      this.generateData();
    }
  }
  get licenses() { return this._licenses; }

  private _subscription: ISubscription;
  @Input() set subscription(subscription: ISubscription) {
    if (subscription !== this._subscription) {
      this._subscription = subscription;

      this.generateData();

      this.ctrlAccount.setValue(subscription?.client);
      this.ctrlTarif.setValue(subscription?.tarifId);
      this.ctrlDevices.setValue(subscription?.devices);
      this.ctrlStatus.setValue(subscription?.status);
    }
  }

  get subscription() { return this._subscription; }

  private _data: IData;

  get data() {
    return this._data;
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ISubscription>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ISubscription>();

  isEdit = false;

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      client: this.ctrlAccount,
      tarifId: this.ctrlTarif,
      devices: this.ctrlDevices,
      status: this.ctrlStatus,
    });
  }

  private generateData(): void {
    this._data = {
      applicationName: {
        key: "Приложение",
        value: this._subscription?.tarif?.application?.name || ' ---',
      },
      tarifName: {
        key: "Тариф",
        value: this._subscription?.tarif?.name || ' ---',
      },
      trialPeriod: {
        key: "Бесплатный период",
        value: `${this._subscription?.tarif?.trialPeriodDuration} дней` || ' ---',
      },
      price: {
        key: "Цена",
        value: formatTarifCostByDevices(this._subscription?.tarif?.costByDevices) || ' ---',
      },
      dateStart: {
        key: "Время начала лицензионного периода",
        value: this._subscription ? moment(this._subscription?.createdDate).format("DD-MM-YYYY") : ' ---',
      },
      dateEnd: {
        key: "Время завершения лицензионного периода",
        value: this._subscription ? moment(this._subscription?.expiredDate).format("DD-MM-YYYY") : ' ---',
      },
      state: {
        key: "Статус",
        value: String(this._subscription?.status) || ' ---',
      },
      integration: {
        key: "Название",
        value: this._subscription?.tarif?.integration?.name || ' ---',
      },
      integrationVersion: {
        key: "Версия интеграции",
        value: this._subscription?.tarif?.integration?.version?.version || '---',
      },
      licenses: this._licenses?.map((license, index) => ({
        key: {
          key: `Лицензия_${index + 1}`,
          value: license.key || "---",
          link: ["/admin/licenses/edit", { id: license.id }],
        }
      })),
    }

    console.log(this.data)
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
        ...this._subscription,
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
}

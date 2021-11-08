import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ITerminal, IStore, ILicenseAccount, TerminalTypes, ITerminalKioskConfig, ITerminalEQConfig, IAppTheme } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { IKeyValue } from '@components/key-value/key-value.component';
import moment from 'moment';
import { getTerminalTypeName } from '@app/utils/terminal.util';

interface IData {
  terminalName: IKeyValue;
  terminalType: IKeyValue;
  terminalImei: IKeyValue;
  terminalStatus: IKeyValue;
  terminalLastwork: IKeyValue;
  terminalStoreName: IKeyValue;
  terminalStoreAddress: IKeyValue;
  terminalLicenseType: IKeyValue;
  terminalLicenseDateStart: IKeyValue;
  terminalLicenseDateEnd: IKeyValue;
  // config
  terminalConfigTheme: IKeyValue;
  // kiosk
  terminalKioskConfigSuffix: IKeyValue;
  // eq
  terminalEQConfigLayoutNewColumns: IKeyValue;
  terminalEQConfigLayoutNewRows: IKeyValue;
  terminalEQConfigLayoutCompleteColumns: IKeyValue;
  terminalEQConfigLayoutCompleteRows: IKeyValue;
}

@Component({
  selector: 'ta-terminal-creator-form',
  templateUrl: './terminal-creator-form.component.html',
  styleUrls: ['./terminal-creator-form.component.scss']
})
export class TerminalCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly TerminalTypes = TerminalTypes;

  form: FormGroup;

  ctrlStore = new FormControl('', [Validators.required]);

  ctrlName = new FormControl('', [Validators.required]);

  ctrlConfig = new FormControl(undefined, [Validators.required]);

  private _data: IData;

  get data() {
    return this._data;
  }

  private _themes: Array<IAppTheme>;
  @Input() set themes(v: Array<IAppTheme>) {
    if (this._themes !== v) {
      this._themes = v;

      this.generateData();
    }
  }
  get themes() { return this._themes; }

  @Input() stores: IStore;

  private _terminal: ITerminal;
  @Input() set terminal(v: ITerminal) {
    if (this._terminal !== v) {
      this._terminal = v;

      this.generateData();

      this.ctrlName.setValue(v.name);
      this.ctrlStore.setValue(v.storeId);
      this.ctrlConfig.setValue(v.config);
    }
  }

  get terminal() { return this._terminal; }

  private _store: IStore;
  @Input() set store(v: IStore) {
    if (this._store !== v) {
      this._store = v;

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

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<ITerminal>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ITerminal>();

  isEdit = false;

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      storeId: this.ctrlStore,
      config: this.ctrlConfig,
    })
  }

  private generateData(): void {
    if (!this._terminal || !this._themes) {
      return;
    }

    this._data = {
      terminalName: {
        key: "Название терминала",
        value: this._terminal?.name || ' ---',
      },
      terminalType: {
        key: "Тип устройства",
        value: getTerminalTypeName(this._terminal?.type) || ' ---',
      },
      terminalImei: {
        key: "imei",
        value: this._terminal?.imei || ' ---',
      },
      terminalStatus: {
        key: "Статус",
        value: this._terminal?.status || ' ---',
      },
      terminalLastwork: {
        key: "Последнее время доступности",
        value: this._terminal ? moment(this._terminal?.lastwork).format("DD-MM-YYYY") : ' ---',
      },
      terminalStoreName: {
        key: "Название магазина",
        value: this._store?.name || ' ---',
        link: this._store ? ["/admin/stores/edit", { id: this._store?.id }] : undefined,
      },
      terminalStoreAddress: {
        key: "Адрес магазина",
        value: this._store?.address || ' ---',
      },
      terminalLicenseType: {
        key: "Лицензия",
        value: this._license?.subscription?.tarif?.application?.name || ' ---',
        link: this._license ? ["/admin/licenses-account/view", { id: this._license?.id }] : undefined,
      },
      terminalLicenseDateStart: {
        key: "Время начала лицензионного периода",
        value: this._license ? moment(this._license?.subscription?.createdDate).format("DD-MM-YYYY") : ' ---',
      },
      terminalLicenseDateEnd: {
        key: "Время завершения лицензионного периода",
        value: this._license ? moment(this._license?.subscription?.expiredDate).format("DD-MM-YYYY") : ' ---',
      },
      // config
      terminalConfigTheme: {
        key: "Тема оформления",
        value: this._themes.find(t => t.id === this._terminal?.config?.theme)?.name || ' ---',
      },
      // kiosk
      terminalKioskConfigSuffix: {
        key: "Суффикс киоска",
        value: (this._terminal?.config as ITerminalKioskConfig)?.suffix || ' ---',
      },
      // eq
      terminalEQConfigLayoutNewColumns: {
        key: "Количество колонок в категории \"Новые\"",
        value: String((this._terminal?.config as ITerminalEQConfig)?.layout?.new?.columns) || ' ---',
      },
      terminalEQConfigLayoutNewRows: {
        key: "Количество строк в категории \"Новые\"",
        value: String((this._terminal?.config as ITerminalEQConfig)?.layout?.new?.rows) || ' ---',
      },
      terminalEQConfigLayoutCompleteColumns: {
        key: "Количество колонок в категории \"Готовые\"",
        value: String((this._terminal?.config as ITerminalEQConfig)?.layout?.complete?.columns) || ' ---',
      },
      terminalEQConfigLayoutCompleteRows: {
        key: "Количество строк в категории \"Готовые\"",
        value: String((this._terminal?.config as ITerminalEQConfig)?.layout?.complete?.rows) || ' ---',
      },
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSubmit();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit({
        ...this._terminal,
        ...this.form.value,
        extra: !!this._terminal ? this._terminal.extra : {},
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
    return !!this._license;
  }
}

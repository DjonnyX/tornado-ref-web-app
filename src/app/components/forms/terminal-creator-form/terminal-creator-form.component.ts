import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ITerminal, IStore, LicenseStatuses, LicenseStates, ILicenseAccount } from '@djonnyx/tornado-types';
import { BaseComponent } from '@components/base/base-component';
import { IKeyValue } from '@components/key-value/key-value.component';
import moment from 'moment';

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
}

@Component({
  selector: 'ta-terminal-creator-form',
  templateUrl: './terminal-creator-form.component.html',
  styleUrls: ['./terminal-creator-form.component.scss']
})
export class TerminalCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlStore = new FormControl('', [Validators.required]);

  ctrlName = new FormControl('', [Validators.required]);

  private _data: IData;

  get data() {
    return this._data;
  }

  @Input() stores: IStore;

  private _terminal: ITerminal;
  @Input() set terminal(v: ITerminal) {
    if (this._terminal !== v) {
      this._terminal = v;

      this.generateData();

      this.ctrlName.setValue(v.name);
      this.ctrlStore.setValue(v.storeId);
    }
  }

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
    })
  }

  private generateData(): void {
    if (!this._terminal) {
      return;
    }

    this._data = {
      terminalName: {
        key: "Название терминала",
        value: this._terminal?.name || ' ---',
      },
      terminalType: {
        key: "Тип устройства",
        value: this._terminal?.type || ' ---',
      },
      terminalImei: {
        key: "imei",
        value: this._terminal?.imei || ' ---',
      },
      terminalStatus: {
        key: "Статут",
        value: this._terminal?.status || ' ---',
      },
      terminalLastwork: {
        key: "Последнее время доступности",
        value: moment(this._terminal?.lastwork).format("DD-MM-YYYY") || ' ---',
      },
      terminalStoreName: {
        key: "Название магазина",
        value: this._store?.name || ' ---',
        link: ["/admin/stores/edit", { id: this._store?.id }],
      },
      terminalStoreAddress: {
        key: "Адрес магазина",
        value: this._store?.address || ' ---',
      },
      terminalLicenseType: {
        key: "Лицензия",
        value: this._license?.licType?.name || ' ---',
        link: ["/admin/licenses-account/view", { id: this._license?.id }],
      },
      terminalLicenseDateStart: {
        key: "Время начала лицензионного периода",
        value: moment(this._license?.dateStart).format("DD-MM-YYYY") || ' ---',
      },
      terminalLicenseDateEnd: {
        key: "Время завершения лицензионного периода",
        value: moment(this._license?.dateEnd).format("DD-MM-YYYY") || ' ---',
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

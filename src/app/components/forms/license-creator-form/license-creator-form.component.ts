import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IIntegration, ILicense, ILicenseType } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import moment from 'moment';

interface IData {
  name: IKeyValue;
  dateEnd: IKeyValue;
  dateStart: IKeyValue;
  key: IKeyValue;
  price: IKeyValue;
  state: IKeyValue;
  status: IKeyValue;
}

@Component({
  selector: 'ta-license-creator-form',
  templateUrl: './license-creator-form.component.html',
  styleUrls: ['./license-creator-form.component.scss']
})
export class LicenseCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlLicenseType = new FormControl('', [Validators.required]);

  @Input() licenseTypes: Array<ILicenseType>;

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
    }
  }

  private _license: ILicense;
  @Input() set license(license: ILicense) {
    if (license !== this._license) {
      this._license = license;

      this.generateData();

      this.ctrlLicenseType.setValue(license.licTypeId);
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
      licTypeId: this.ctrlLicenseType,
    });
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
    }
  }

  ngOnInit(): void {
    /*this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    })*/;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSave();
    }
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onSave(): void {
    if (this.form.valid) {
      
      this.save.emit({
        ...this._license,
        ...this.form.value,
      });

      this.isEdit = false;
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ILicense } from '@djonnyx/tornado-types';
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

  /*ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');*/

  private _license: ILicense;
  @Input() set license(license: ILicense) {
    if (license !== this._license) {
      this._license = license;

      this.generateData();
      /*this.ctrlName.setValue(license.name);
      this.ctrlDescription.setValue(license.description);*/

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

  constructor(private _fb: FormBuilder) {
    super();

    /*this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
    })*/
  }

  private generateData(): void {
    console.log(this._license)
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

      // this.onSave();
    }
  }

  /*onSave(): void {
    if (this.form.valid) {
      
      this.save.emit({
        ...this._license,
        ...this.form.value,
      });
    }
  }*/

  onCancel(): void {
    this.cancel.emit();
  }
}

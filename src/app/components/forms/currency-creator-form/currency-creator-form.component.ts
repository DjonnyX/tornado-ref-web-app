import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ICurrency } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { LocalizationService } from '@app/services/localization/localization.service';

interface IData {
  code: IKeyValue;
  name: IKeyValue;
  symbol: IKeyValue;
}

@Component({
  selector: 'ta-currency-creator-form',
  templateUrl: './currency-creator-form.component.html',
  styleUrls: ['./currency-creator-form.component.scss']
})
export class CurrencyCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlCode = new FormControl('', [Validators.required]);

  ctrlName = new FormControl('', [Validators.required]);

  ctrlSymbol = new FormControl('', [Validators.required]);

  private _currency: ICurrency;
  @Input() set currency(currency: ICurrency) {
    if (currency) {
      this._currency = currency;

      this.generateData();

      this.ctrlCode.setValue(currency.code);
      this.ctrlName.setValue(currency.name);
      this.ctrlSymbol.setValue(currency.symbol);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<ICurrency>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ICurrency>();

  isEdit: boolean = false;

  private _data: IData;

  get data() {
    return this._data;
  }

  constructor(
    private _fb: FormBuilder,
    public readonly localization: LocalizationService,
    ) {
    super();

    this.form = this._fb.group({
      code: this.ctrlCode,
      name: this.ctrlName,
      symbol: this.ctrlSymbol,
    })
  }

  private generateData(): void {
    if (!this._currency) {
      return;
    }

    this._data = {
      code: {
        key: "Код",
        value: this._currency?.code || ' ---',
      },
      name: {
        key: "Название",
        value: this._currency?.name || ' ---',
      },
      symbol: {
        key: "Символ",
        value: this._currency?.symbol || ' ---',
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

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSave();
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.submitForm.emit({
        ...this._currency,
        ...this.form.value,
        extra: !!this._currency ? this._currency.extra : {},
      });

      this.isEdit = false;
    }
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onEditCancel(): void {
    this.isEdit = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

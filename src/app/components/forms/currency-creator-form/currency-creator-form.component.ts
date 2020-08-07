import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ICurrency } from '@djonnyx/tornado-types';

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

      this.ctrlCode.setValue(currency.code);
      this.ctrlName.setValue(currency.name);
      this.ctrlSymbol.setValue(currency.symbol);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<ICurrency>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ICurrency>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      code: this.ctrlCode,
      name: this.ctrlName,
      symbol: this.ctrlSymbol,
    })
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

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit({
        ...this._currency,
        ...this.form.value,
        extra: !!this._currency ? this._currency.extra : {},
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

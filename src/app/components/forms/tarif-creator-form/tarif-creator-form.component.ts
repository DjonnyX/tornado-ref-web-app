import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IApplication, ITarif, TarifPaymentPeriods, TerminalTypes } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-tarif-creator-form',
  templateUrl: './tarif-creator-form.component.html',
  styleUrls: ['./tarif-creator-form.component.scss']
})
export class TarifCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly paymentPeriods = [
    TarifPaymentPeriods.EVERY_MONTH,
    TarifPaymentPeriods.EVERY_3_MONTHS,
    TarifPaymentPeriods.EVERY_6_MONTHS,
    TarifPaymentPeriods.EVERY_12_MONTHS,
    TarifPaymentPeriods.EVERY_13_MONTHS,
    TarifPaymentPeriods.EVERY_15_MONTHS,
    TarifPaymentPeriods.EVERY_18_MONTHS,
    TarifPaymentPeriods.EVERY_24_MONTHS,
    TarifPaymentPeriods.EVERY_36_MONTHS,
  ];

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlApplication = new FormControl('', [Validators.required]);

  ctrlServiceId = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlTrialPeriodDuration = new FormControl(0, [Validators.required]);

  ctrlPaymentPeriod = new FormControl(TarifPaymentPeriods.EVERY_MONTH, [Validators.required]);

  ctrlVersion = new FormControl(null);

  private _tarif: ITarif;
  @Input() set tarif(tarif: ITarif) {
    if (tarif) {
      this._tarif = tarif;

      this.ctrlApplication.setValue(tarif.applicationId);
      this.ctrlServiceId.setValue(tarif.serviceId);
      this.ctrlName.setValue(tarif.name);
      this.ctrlDescription.setValue(tarif.description);
      this.ctrlTrialPeriodDuration.setValue(tarif.trialPeriodDuration);
      this.ctrlPaymentPeriod.setValue(tarif.paymentPeriod);
    }
  }

  @Input() applications: Array<IApplication>;

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ITarif>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ITarif>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      serviceId: this.ctrlServiceId,
      terminalType: this.ctrlApplication,
      name: this.ctrlName,
      description: this.ctrlDescription,
      trialPeriodDuration: this.ctrlTrialPeriodDuration,
      paymentPeriod: this.ctrlPaymentPeriod,
    });
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
      this.save.emit({
        ...this._tarif,
        ...this.form.value,
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

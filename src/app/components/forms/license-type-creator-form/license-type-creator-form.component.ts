import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IApplication, IIntegration, ILicenseType, TerminalTypes } from '@djonnyx/tornado-types';
import { getTerminalTypeName } from '@app/utils/terminal.util';

const AppTypesList = [
  {
    value: TerminalTypes.KIOSK,
    name: getTerminalTypeName(TerminalTypes.KIOSK),
  },
  {
    value: TerminalTypes.ORDER_PICKER,
    name: getTerminalTypeName(TerminalTypes.ORDER_PICKER),
  },
  {
    value: TerminalTypes.EQUEUE,
    name: getTerminalTypeName(TerminalTypes.EQUEUE),
  },
  {
    value: TerminalTypes.EQUEUE_CONTROLLER,
    name: getTerminalTypeName(TerminalTypes.EQUEUE_CONTROLLER),
  },
];

@Component({
  selector: 'ta-license-type-creator-form',
  templateUrl: './license-type-creator-form.component.html',
  styleUrls: ['./license-type-creator-form.component.scss']
})
export class LicenseTypeCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  readonly appTypes = AppTypesList;

  @Input() applications: Array<IApplication>;

  form: FormGroup;

  ctrlApplication = new FormControl(undefined, [Validators.required]);

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlPrice = new FormControl(0, [Validators.required]);

  ctrlPayNotice = new FormControl('', [Validators.required]);

  ctrlIntegration = new FormControl('', [Validators.required]);

  @Input() integrations: Array<IIntegration>;

  private _licenseType: ILicenseType;
  @Input() set licenseType(licenseType: ILicenseType) {
    if (licenseType) {
      this._licenseType = licenseType;

      this.ctrlApplication.setValue(licenseType.applicationId);
      this.ctrlName.setValue(licenseType.name);
      this.ctrlDescription.setValue(licenseType.description);
      this.ctrlPrice.setValue(Number(licenseType.price) * 0.01);
      this.ctrlPayNotice.setValue(licenseType.payNotice);
      this.ctrlIntegration.setValue(licenseType.integrationId);

    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ILicenseType>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ILicenseType>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      applicationId: this.ctrlApplication,
      integrationId: this.ctrlIntegration,
      name: this.ctrlName,
      description: this.ctrlDescription,
      price: this.ctrlPrice,
      payNotice: this.ctrlPayNotice,
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
        ...this._licenseType,
        ...this.form.value,
        price: parseInt(this.form.get("price").value) * 100,
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

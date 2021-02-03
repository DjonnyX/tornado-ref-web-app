import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IIntegration, ILicenseType } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-license-type-creator-form',
  templateUrl: './license-type-creator-form.component.html',
  styleUrls: ['./license-type-creator-form.component.scss']
})
export class LicenseTypeCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

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
      name: this.ctrlName,
      description: this.ctrlDescription,
      price: this.ctrlPrice,
      payNotice: this.ctrlPayNotice,
      integrationId: this.ctrlIntegration,
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

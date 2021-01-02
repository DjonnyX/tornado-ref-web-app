import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ILicenseType } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-license-type-creator-form',
  templateUrl: './license-type-creator-form.component.html',
  styleUrls: ['./license-type-creator-form.component.scss']
})
export class LicenseTypeCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _licenseType: ILicenseType;
  @Input() set licenseType(licenseType: ILicenseType) {
    if (licenseType) {
      this._licenseType = licenseType;

      this.ctrlName.setValue(licenseType.name);
      this.ctrlDescription.setValue(licenseType.description);

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
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

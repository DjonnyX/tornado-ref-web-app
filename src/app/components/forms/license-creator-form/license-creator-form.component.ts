import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ILicense } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-license-creator-form',
  templateUrl: './license-creator-form.component.html',
  styleUrls: ['./license-creator-form.component.scss']
})
export class LicenseCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _license: ILicense;
  @Input() set license(license: ILicense) {
    if (license) {
      this._license = license;

      /*this.ctrlName.setValue(license.name);
      this.ctrlDescription.setValue(license.description);*/

    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ILicense>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ILicense>();

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
        ...this._license,
        ...this.form.value,
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

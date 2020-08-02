import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IBusinessPeriod } from '@djonnyx/tornado-types';
import { ScheduleComponent } from '@components/schedule/schedule.component';

@Component({
  selector: 'ta-business-period-creator-form',
  templateUrl: './business-period-creator-form.component.html',
  styleUrls: ['./business-period-creator-form.component.scss']
})
export class BusinessPeriodCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild("schedule", { static: true }) private _schedule: ScheduleComponent;

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _businessPeriod: IBusinessPeriod;
  @Input() set businessPeriod(businessPeriod: IBusinessPeriod) {
    if (businessPeriod) {
      this._businessPeriod = businessPeriod;

      this.ctrlName.setValue(businessPeriod.name);
      this.ctrlDescription.setValue(businessPeriod.description);
      this._schedule.setValue(businessPeriod.schedule);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submit = new EventEmitter<IBusinessPeriod>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IBusinessPeriod>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit({
        ...this._businessPeriod,
        ...this.form.value, schedule: this._schedule.value || [],
        active: !!this._businessPeriod && this._businessPeriod.active !== undefined ? this._businessPeriod.active : true,
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

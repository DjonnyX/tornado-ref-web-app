import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IOrderType } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-order-type-creator-form',
  templateUrl: './order-type-creator-form.component.html',
  styleUrls: ['./order-type-creator-form.component.scss']
})
export class OrderTypeCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('', [Validators.required]);

  ctrlSymbol = new FormControl('', [Validators.required]);

  private _orderType: IOrderType;
  @Input() set orderType(orderType: IOrderType) {
    if (orderType) {
      this._orderType = orderType;

      this.ctrlName.setValue(orderType.name);
      this.ctrlDescription.setValue(orderType.description);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<IOrderType>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IOrderType>();

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

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit({
        ...this._orderType,
        ...this.form.value,
        extra: !!this._orderType ? this._orderType.extra : {},
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IStore } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-store-creator-form',
  templateUrl: './store-creator-form.component.html',
  styleUrls: ['./store-creator-form.component.scss']
})
export class StoreCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {
  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlAddress = new FormControl('', [Validators.required]);

  private _store: IStore;
  @Input() set store(store: IStore) {
    if (store) {
      this._store = store;

      this.ctrlName.setValue(store.name);
      this.ctrlAddress.setValue(store.address);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<IStore>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IStore>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      address: this.ctrlAddress,
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
        ...this._store,
        ...this.form.value,
        extra: !!this._store ? this._store.extra : {},
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

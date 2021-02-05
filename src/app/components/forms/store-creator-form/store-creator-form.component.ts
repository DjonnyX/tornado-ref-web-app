import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IStore } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';

interface IData {
  storeName: IKeyValue;
  storeAddress: IKeyValue;
  storeTerminals: Array<IKeyValue>;
}

@Component({
  selector: 'ta-store-creator-form',
  templateUrl: './store-creator-form.component.html',
  styleUrls: ['./store-creator-form.component.scss']
})
export class StoreCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {
  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlAddress = new FormControl('', [Validators.required]);

  private _data: IData;

  get data() {
    return this._data;
  }

  private _store: IStore;
  @Input() set store(store: IStore) {
    if (store) {
      this._store = store;

      this.generateData();

      this.ctrlName.setValue(store.name);
      this.ctrlAddress.setValue(store.address);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<IStore>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IStore>();

  isEdit = false;

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      address: this.ctrlAddress,
    })
  }

  private generateData(): void {
    if (!this._store) {
      return;
    }

    this._data = {
      storeName: {
        key: "Название",
        value: this._store?.name || ' ---',
      },
      storeAddress: {
        key: "Адрес",
        value: this._store?.address || ' ---',
      },
      storeTerminals: [],
    };

    /*
    terminalStoreName: {
      key: "Название магазина",
      value: this._store?.name || ' ---',
      link: ["/admin/stores/edit", { id: this._store?.id }],
    },*/
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

  onEdit(): void {
    this.isEdit = true;
  }

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSubmit();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit({
        ...this._store,
        ...this.form.value,
        extra: !!this._store ? this._store.extra : {},
      });
    }

    this.isEdit = false;
  }

  onEditCancel(): void {
    this.isEdit = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IStore, ITerminal } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { getTerminalTypeName } from '@app/utils/terminal.util';

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

  private _terminals: Array<ITerminal>;
  @Input() set terminals(terminals: Array<ITerminal>) {
    if (terminals) {
      this._terminals = terminals;

      this.generateData();
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

    if (!!this._terminals && this._terminals.length > 0) {
      this._data.storeTerminals = this._terminals.map(v => ({
        key: getTerminalTypeName(v.type),
        value: v.name,
        link: ["/admin/terminals/edit", { id: v.id }],
      }));
    }
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

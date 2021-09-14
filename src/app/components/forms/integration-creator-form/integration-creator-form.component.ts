import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IIntegration, UserRights } from '@djonnyx/tornado-types';

interface IRight {
  name: string;
  value: number;
}

const RIGHTS = [
  {
    name: "CREATE_PRODUCT",
    value: UserRights.CREATE_PRODUCT,
  }, {
    name: "DELETE_PRODUCT",
    value: UserRights.DELETE_PRODUCT,
  }, {
    name: "CREATE_SELECTOR",
    value: UserRights.CREATE_SELECTOR,
  }, {
    name: "DELETE_SELECTOR",
    value: UserRights.DELETE_SELECTOR,
  }, {
    name: "CREATE_CURRENCY",
    value: UserRights.CREATE_CURRENCY,
  }, {
    name: "DELETE_CURRENCY",
    value: UserRights.DELETE_CURRENCY,
  }, {
    name: "CREATE_STORE",
    value: UserRights.CREATE_STORE,
  }, {
    name: "CREATE_TERMINAL",
    value: UserRights.CREATE_TERMINAL,
  }, {
    name: "DELETE_TERMINAL",
    value: UserRights.DELETE_TERMINAL,
  }, {
    name: "ENABLE_ORDER_TYPES",
    value: UserRights.READ_ORDER_TYPES,
  }, {
    name: "READ_CHECKUES",
    value: UserRights.READ_CHECKUES,
  },
];

@Component({
  selector: 'ta-integration-creator-form',
  templateUrl: './integration-creator-form.component.html',
  styleUrls: ['./integration-creator-form.component.scss']
})
export class IntegrationCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly rights = RIGHTS;

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlHost = new FormControl('', [Validators.required, Validators.pattern("^((http|https):\/\/).*\/$")]);

  ctrlActive = new FormControl(true);

  ctrlRights = new FormControl(RIGHTS.map(v => v.value), [Validators.required]);

  ctrlVersion = new FormControl(null);

  private _integration: IIntegration;
  @Input() set integration(integration: IIntegration) {
    if (integration) {
      this._integration = integration;

      this.ctrlName.setValue(integration.name);
      this.ctrlHost.setValue(integration.host);
      this.ctrlActive.setValue(integration.active);
      this.ctrlRights.setValue(integration.rights);
      this.ctrlVersion.setValue(integration.version);
    }
  }

  @Output() save = new EventEmitter<IIntegration>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IIntegration>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      host: this.ctrlHost,
      name: this.ctrlName,
      active: this.ctrlActive,
      rights: this.ctrlRights,
      version: this.ctrlVersion,
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
        ...this._integration,
        ...this.form.value,
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

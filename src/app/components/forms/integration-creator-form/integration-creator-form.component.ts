import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IIntegration, UserRights } from '@djonnyx/tornado-types';
import { USER_RIGHTS_LIST } from '@app/utils/right.util';

@Component({
  selector: 'ta-integration-creator-form',
  templateUrl: './integration-creator-form.component.html',
  styleUrls: ['./integration-creator-form.component.scss']
})
export class IntegrationCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly rights = [...USER_RIGHTS_LIST];

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlHost = new FormControl('', [Validators.required, Validators.pattern("^((http|https):\/\/).*\/$")]);

  ctrlActive = new FormControl(true);

  ctrlRights = new FormControl(USER_RIGHTS_LIST.map(v => v.value), [Validators.required]);

  ctrlVersion = new FormControl(null);

  private _integration: IIntegration;
  @Input() set integration(integration: IIntegration) {
    if (integration) {
      this._integration = integration;

      //this.ctrlName.setValue(integration.name);
      this.ctrlHost.setValue(integration.host);
      this.ctrlActive.setValue(integration.active);
      //this.ctrlRights.setValue(integration.rights);
      //this.ctrlVersion.setValue(integration.version);
    }
  }

  @Output() save = new EventEmitter<IIntegration>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IIntegration>();

  @Output() update = new EventEmitter<IIntegration>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      host: this.ctrlHost,
      name: this.ctrlName,
      active: this.ctrlActive,
      rights: this.ctrlRights,
      version: this.ctrlVersion,
    });

    this.ctrlName.disable();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    });

    this.ctrlHost.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(250),
    ).subscribe(v => {

    });
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

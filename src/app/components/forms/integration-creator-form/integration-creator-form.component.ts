import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { IIntegration, IIntegrationServerInfo, UserRights } from '@djonnyx/tornado-types';
import { IUserRightData, USER_RIGHTS_LIST } from '@app/utils/right.util';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-integration-creator-form',
  templateUrl: './integration-creator-form.component.html',
  styleUrls: ['./integration-creator-form.component.scss']
})
export class IntegrationCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public rights: Array<IUserRightData>;

  form: FormGroup;

  ctrlName = new FormControl("", [Validators.required]);

  ctrlHost = new FormControl("", [Validators.required, Validators.pattern("^((http|https):\/\/).*\/$")]);

  ctrlVerificationKey = new FormControl("", [Validators.required]);

  ctrlActive = new FormControl(true);

  ctrlRights = new FormControl(null, [Validators.required]);

  ctrlVersion = new FormControl(null);

  private _integration: IIntegration;
  @Input() set integration(integration: IIntegration) {
    if (integration) {
      this._integration = integration;

      this.ctrlHost.setValue(integration.host);
      this.ctrlVerificationKey.setValue(integration.verificationKey);
      this.ctrlActive.setValue(integration.active);
    }
  }
  get integration() { return this._integration; }

  private _integrationServerInfo: IIntegrationServerInfo;
  @Input() set integrationServerInfo(integrationServerInfo: IIntegrationServerInfo) {
    if (integrationServerInfo) {
      this._integrationServerInfo = integrationServerInfo;

      this.ctrlName.setValue(integrationServerInfo.serverName);
      this.rights = USER_RIGHTS_LIST.filter(r => integrationServerInfo.availableRights?.indexOf(r.value) > -1);
      this.ctrlVersion.setValue({
        name: integrationServerInfo.versionName,
        code: integrationServerInfo.versionCode,
        version: integrationServerInfo.version,
      });
    }
  }
  get integrationServerInfo() { return this._integrationServerInfo; }

  @Output() save = new EventEmitter<IIntegration>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IIntegration>();

  constructor(
    private _fb: FormBuilder,
    public readonly localization: LocalizationService,
  ) {
    super();

    this.form = this._fb.group({
      host: this.ctrlHost,
      verificationKey: this.ctrlVerificationKey,
      active: this.ctrlActive,
    });

    this.ctrlName.disable();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      filter(v => this.form.valid),
      debounceTime(250),
    ).subscribe(value => {
      this.update.emit(value);
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

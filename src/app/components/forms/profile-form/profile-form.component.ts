import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { IAccount, IIntegration } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { IUserProfile } from '@models';
import { NAME_PATTERN } from '@app/core/patterns';
import { LocalizationService } from '@app/services/localization/localization.service';
import { IStoreRequest } from '@store/interfaces/store-request.interface';

interface IData {
  firstName: IKeyValue;
  lastName: IKeyValue;
  email: IKeyValue;
  integration: IKeyValue;
}

@Component({
  selector: 'ta-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent extends BaseComponent implements OnInit, OnDestroy {
  mainForm: FormGroup;

  integrationForm: FormGroup;

  ctrlFirstName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);

  ctrlLastName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);

  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);

  ctrlIntegration = new FormControl(null);

  private _data: IData;

  get data() {
    return this._data;
  }

  private _profile: IUserProfile;
  @Input() set profile(profile: IUserProfile) {
    if (profile) {
      this._profile = profile;

      this.generateData();

      this.ctrlFirstName.setValue(profile?.account?.firstName);
      this.ctrlLastName.setValue(profile?.account?.lastName);
      this.ctrlEmail.setValue(profile?.account?.email);
      this.ctrlIntegration.setValue(profile?.account?.integrationId || null);

      this.isMainFormEdit = false;
    }
  }
  get profile() { return this._profile };

  private _integrations: Array<IIntegration>;
  @Input() set integrations(integrations: Array<IIntegration>) {
    if (integrations) {
      this._integrations = integrations;

      this.generateData();

      this.isIntegrationFormEdit = false;
    }
  }
  get integrations() { return this._integrations; }

  @Output() saveUserInfo = new EventEmitter<IStoreRequest<{ id: string, data: IAccount }, IAccount>>();

  @Output() cancel = new EventEmitter<void>();

  isProfileInfoProcess = false;

  isIntegrationsProcess = false;

  isMainFormEdit = false;

  isIntegrationFormEdit = false;

  constructor(
    public readonly localization: LocalizationService,
    private _fb: FormBuilder,
  ) {
    super();

    this.mainForm = this._fb.group({
      firstName: this.ctrlFirstName,
      lastName: this.ctrlLastName,
    });

    this.integrationForm = this._fb.group({
      integrationId: this.ctrlIntegration,
    });
  }

  private generateData(): void {
    if (!this._profile) {
      return;
    }

    this._data = {
      firstName: {
        key: "Имя",
        value: this._profile?.account?.firstName || ' ---',
      },
      lastName: {
        key: "Фамилия",
        value: this._profile?.account?.lastName || ' ---',
      },
      email: {
        key: "email",
        value: this._profile?.account?.email || ' ---',
      },
      integration: {
        key: "Интеграция",
        value: this._integrations?.find(item => item.id === this._profile?.account?.integrationId)?.name || ' Отсутствует',
      },
    };
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onMainFormEdit(): void {
    this.isMainFormEdit = true;
  }

  onMainFormEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onMainFormSubmit();
    }
  }

  onMainFormSubmit(): void {
    if (this.mainForm.valid) {
      this.isProfileInfoProcess = true;
      this.saveUserInfo.emit(
        {
          params: {
            id: this._profile?.account?.id,
            data: this.mainForm.getRawValue(),
          },
          callback: (account: IAccount) => {
            this.isProfileInfoProcess = false;
            this.isMainFormEdit = false;
          },
        }
      );
    }
  }

  onMainFormEditCancel(): void {
    this.isMainFormEdit = false;
    this.ctrlFirstName.setValue(this._profile?.account?.firstName);
    this.ctrlLastName.setValue(this._profile?.account?.lastName);
  }

  onIntegrationFormEdit(): void {
    this.isIntegrationFormEdit = true;
  }

  onIntegrationFormEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onIntegrationFormSubmit();
    }
  }

  onIntegrationFormSubmit(): void {
    if (this.integrationForm.valid) {
      this.isIntegrationsProcess = true;
      this.saveUserInfo.emit(
        {
          params: {
            id: this._profile?.account?.id,
            data: this.integrationForm.getRawValue(),
          },
          callback: (account: IAccount) => {
            this.isIntegrationsProcess = false;
            this.isIntegrationFormEdit = false;
          },
        }
      );
    }
  }

  onIntegrationFormEditCancel(): void {
    this.isIntegrationFormEdit = false;
    this.ctrlIntegration.setValue(this._profile?.account?.integrationId || null);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

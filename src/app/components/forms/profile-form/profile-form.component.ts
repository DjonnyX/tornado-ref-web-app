import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IStore, ITerminal } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { getTerminalTypeName } from '@app/utils/terminal.util';
import { IUserProfile } from '@models';
import { NAME_PATTERN } from '@app/core/patterns';
import { LocalizationService } from '@app/services/localization/localization.service';

interface IData {
  firstName: IKeyValue;
  lastName: IKeyValue;
  email: IKeyValue;
}

@Component({
  selector: 'ta-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent extends BaseComponent implements OnInit, OnDestroy {
  mainForm: FormGroup;

  ctrlFirstName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);

  ctrlLastName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);

  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);

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

      this.isMainFormEdit = false;
    }
  }

  @Output() saveUserInfo = new EventEmitter<IStore>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IStore>();

  @Input() isProfileInfoProcess = false;

  isMainFormEdit = false;

  constructor(
    public readonly localization: LocalizationService,
    private _fb: FormBuilder,
  ) {
    super();

    this.mainForm = this._fb.group({
      firstName: this.ctrlFirstName,
      lastName: this.ctrlLastName,
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
    };
  }

  ngOnInit(): void {
    this.mainForm.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    })
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
      this.saveUserInfo.emit({
        ...this.mainForm.getRawValue(),
      });
    }
  }

  onMainFormEditCancel(): void {
    this.isMainFormEdit = false;
    this.ctrlFirstName.setValue(this._profile?.account?.firstName);
    this.ctrlLastName.setValue(this._profile?.account?.lastName);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

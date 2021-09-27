import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { IRole } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { LocalizationService } from '@app/services/localization/localization.service';
import { IUserRightData } from '@app/utils/right.util';

interface IData {
  name: IKeyValue;
  description: IKeyValue;
  rights: IKeyValue;
}

@Component({
  selector: 'ta-role-creator-form',
  templateUrl: './role-creator-form.component.html',
  styleUrls: ['./role-creator-form.component.scss']
})
export class RoleCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);
  ctrlDescription = new FormControl('', [Validators.required]);
  ctrlRights = new FormControl([], [Validators.required]);

  @Input() readonly: boolean = false;

  private _role: IRole;
  @Input() set role(role: IRole) {
    if (role !== this._role) {
      this._role = role;

      this.generateData();

      this.ctrlName.setValue(role?.name);
      this.ctrlDescription.setValue(role?.description);
      this.ctrlRights.setValue(role?.rights);
    }
  }
  get role() { return this._role; }

  private _roles: Array<IRole>;
  @Input() set roles(roles: Array<IRole>) {
    if (roles !== this._roles) {
      this._roles = roles;

      this.generateData();
    }
  }
  get roles() { return this._roles; }

  private _rights: Array<IUserRightData>;
  @Input() set rights(rights: Array<IUserRightData>) {
    if (rights !== this._rights) {
      this._rights = rights;

      this.generateData();
    }
  }
  get rights() { return this._rights; }

  private _data: IData;

  get data() {
    return this._data;
  }

  private _isEditMode: boolean;
  @Input() set isEditMode(v: boolean) {
    if (this._isEditMode !== v) {
      this._isEditMode = v;
    }
  }
  get isEditMode() { return this._isEditMode; }

  @Output() save = new EventEmitter<IRole>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IRole>();

  @Output() resetCaptcha = new EventEmitter<void>();

  isEdit = false;

  constructor(
    private _fb: FormBuilder,
    public readonly localization: LocalizationService,
  ) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
      rights: this.ctrlRights,
    });
  }

  private generateData(): void {
    this._data = {
      name: {
        key: "Имя",
        value: this._role?.name || ' ---',
      },
      description: {
        key: "Описание",
        value: this._role?.description || ' ---',
      },
      rights: {
        key: "Права",
        value: this._role && this._rights ? this._rights.filter(r => this._role?.rights?.indexOf(r.value) > -1).map(r => r.name).join(";\n") : ' ---',
      },
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSubmit();
    }
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onSubmit(): void {
    if (this.form.valid) {

      this.save.emit({
        ...this._role,
        name: this.ctrlName.value,
        description: this.ctrlDescription.value,
        rights: this.ctrlRights.value,
      } as IRole);

      this.isEdit = false;
    }
  }

  onEditCancel(): void {
    this.isEdit = false;
    if (!this.isEditMode) {
      this.onCancel();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onResetCaptcha(): void {
    this.resetCaptcha.emit();
  }
}

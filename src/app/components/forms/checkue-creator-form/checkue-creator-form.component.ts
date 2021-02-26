import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ICheckue } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';

interface IData {
  name: IKeyValue;
  scenarios: IKeyValue;
}

@Component({
  selector: 'ta-checkue-creator-form',
  templateUrl: './checkue-creator-form.component.html',
  styleUrls: ['./checkue-creator-form.component.scss']
})
export class CheckueCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlScenarios = new FormControl('', [Validators.required]);

  private _checkue: ICheckue;
  @Input() set checkue(checkue: ICheckue) {
    if (checkue) {
      this._checkue = checkue;

      this.generateData();

      this.ctrlName.setValue(checkue.name);
      this.ctrlScenarios.setValue(checkue.scenarios);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<ICheckue>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ICheckue>();

  isEdit: boolean = false;

  private _data: IData;

  get data() {
    return this._data;
  }

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      scenarios: this.ctrlScenarios,
    })
  }

  private generateData(): void {
    if (!this._checkue) {
      return;
    }

    this._data = {
      name: {
        key: "Название",
        value: this._checkue?.name || ' ---',
      },
      scenarios: {
        key: "Сценарии",
        value: "", //this._checkue?.scenarios || ' ---',
      },
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

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSave();
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.submitForm.emit({
        ...this._checkue,
        ...this.form.value,
        extra: !!this._checkue ? this._checkue.extra : {},
      });

      this.isEdit = false;
    }
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onEditCancel(): void {
    this.isEdit = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

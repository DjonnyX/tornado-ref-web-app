import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IApplication } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-application-creator-form',
  templateUrl: './application-creator-form.component.html',
  styleUrls: ['./application-creator-form.component.scss']
})
export class ApplicationCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  private _application: IApplication;
  @Input() set application(application: IApplication) {
    if (application) {
      this._application = application;

      this.ctrlName.setValue(application.name);
      this.ctrlDescription.setValue(application.description);

    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<IApplication>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IApplication>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
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
        ...this._application,
        ...this.form.value,
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

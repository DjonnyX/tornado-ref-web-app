import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IIntegration } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-integration-creator-form',
  templateUrl: './integration-creator-form.component.html',
  styleUrls: ['./integration-creator-form.component.scss']
})
export class IntegrationCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');
  
  ctrlVersion = new FormControl(null);

  private _integration: IIntegration;
  @Input() set integration(integration: IIntegration) {
    if (integration) {
      this._integration = integration;

      this.ctrlName.setValue(integration.name);
      this.ctrlDescription.setValue(integration.description);
      this.ctrlVersion.setValue(integration.version);
    }
  }

  @Output() save = new EventEmitter<IIntegration>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IIntegration>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
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

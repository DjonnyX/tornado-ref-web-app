import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IApplication, TerminalTypes } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-application-creator-form',
  templateUrl: './application-creator-form.component.html',
  styleUrls: ['./application-creator-form.component.scss']
})
export class ApplicationCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly terminalTypes = [
    {
      name: "KIOSK",
      value: TerminalTypes.KIOSK,
    },
    {
      name: "EQUEUE",
      value: TerminalTypes.EQUEUE,
    },
    {
      name: "ORDER_PICKER",
      value: TerminalTypes.ORDER_PICKER,
    }
  ];

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlTerminalType = new FormControl('', [Validators.required]);

  ctrlProductId = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlVersion = new FormControl(null);

  private _application: IApplication;
  @Input() set application(application: IApplication) {
    if (application) {
      this._application = application;

      this.ctrlProductId.setValue(application.productId);
      this.ctrlTerminalType.setValue(application.terminalType);
      this.ctrlName.setValue(application.name);
      this.ctrlDescription.setValue(application.description);
      this.ctrlVersion.setValue(application.version);
    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<IApplication>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IApplication>();

  constructor(
    private _fb: FormBuilder,
    public readonly localization: LocalizationService,
  ) {
    super();

    this.form = this._fb.group({
      productId: this.ctrlProductId,
      terminalType: this.ctrlTerminalType,
      name: this.ctrlName,
      description: this.ctrlDescription,
      version: this.ctrlVersion,
    });
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

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ITerminal, IStore } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-terminal-creator-form',
  templateUrl: './terminal-creator-form.component.html',
  styleUrls: ['./terminal-creator-form.component.scss']
})
export class TerminalCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() stores: Array<IStore>;

  form: FormGroup;

  ctrlStore = new FormControl('', [Validators.required]);

  ctrlName = new FormControl('', [Validators.required]);

  private _terminal: ITerminal;
  @Input() set terminal(terminal: ITerminal) {
    if (terminal) {
      this._terminal = terminal;

      this.ctrlName.setValue(terminal.name);
      this.ctrlStore.setValue(terminal.store);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submitForm = new EventEmitter<ITerminal>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ITerminal>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      store: this.ctrlStore,
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

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit({
        ...this._terminal,
        ...this.form.value,
        extra: !!this._terminal ? this._terminal.extra : {},
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

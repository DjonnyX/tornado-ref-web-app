import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ITag, ISelector } from '@models';

@Component({
  selector: 'ta-selector-creator-form',
  templateUrl: './selector-creator-form.component.html',
  styleUrls: ['./selector-creator-form.component.scss']
})
export class SelectorCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  //ctrlTags = new FormControl([]);

  private _selector: ISelector;
  @Input() set selector(selector: ISelector) {
    if (selector) {
      this._selector = selector;

      this.ctrlName.setValue(selector.name);
      this.ctrlDescription.setValue(selector.description);
      //this.ctrlTags.setValue(selector.tags);
    }
  }

  @Input() isEditMode: boolean;

  @Input() tagList: Array<ITag>;

  @Output() submit = new EventEmitter<ISelector>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ISelector>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
      // tags: this.ctrlTags,
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
      this.submit.emit({ ...this._selector, ...this.form.value });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

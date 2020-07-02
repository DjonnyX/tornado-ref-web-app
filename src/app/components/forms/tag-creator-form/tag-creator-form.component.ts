import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ITag } from '@models';

@Component({
  selector: 'ta-tag-creator-form',
  templateUrl: './tag-creator-form.component.html',
  styleUrls: ['./tag-creator-form.component.scss']
})
export class TagCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlColor = new FormControl('');

  private _tag: ITag;
  @Input() set tag(tag: ITag) {
    if (tag) {
      this._tag = tag;

      this.ctrlName.setValue(tag.name);
      this.ctrlDescription.setValue(tag.description);
      this.ctrlColor.setValue(tag.color);
    }
  }

  @Input() isEditMode: boolean;

  @Output() submit = new EventEmitter<ITag>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ITag>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      description: this.ctrlDescription,
      color: this.ctrlColor,
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
      this.submit.emit({ ...this._tag, ...this.form.value });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

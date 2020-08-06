import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ITag } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-tag-creator-form',
  templateUrl: './tag-creator-form.component.html',
  styleUrls: ['./tag-creator-form.component.scss']
})
export class TagCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  get color() {
    return this.ctrlColor.value;
  }

  set color(v: string) {
    this.ctrlColor.setValue(v);
  }

  ctrlName = new FormControl('', [Validators.required]);

  ctrlDescription = new FormControl('');

  ctrlColor = new FormControl('#000000');

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

  @Output() submitForm = new EventEmitter<ITag>();

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
      this.submitForm.emit({
        ...this._tag,
        ...this.form.value,
        active: !!this._tag && this._tag.active !== undefined ? this._tag.active : true,
        extra: !!this._tag ? this._tag.extra : {},
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

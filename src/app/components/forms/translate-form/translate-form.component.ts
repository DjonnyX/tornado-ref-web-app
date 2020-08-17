import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { ITranslate } from '@djonnyx/tornado-types/dist/interfaces/raw/ITranslation';
import { EditableComponent } from '@components/base/editable/editable.component';

@Component({
  selector: 'ta-translate-form',
  templateUrl: './translate-form.component.html',
  styleUrls: ['./translate-form.component.scss']
})
export class TranslateFormComponent implements OnInit {
  @ViewChildren(EditableComponent) private _crlsValue: QueryList<EditableComponent>;

  @Input() collection: Array<ITranslate>;

  @Output() update = new EventEmitter<ITranslate>();

  displayedColumns = ["key", "value", "control"];

  controls: FormArray;

  constructor() { }

  ngOnInit(): void {
    const groups = this.collection.map(translate => {
      return new FormGroup({
        key: new FormControl(translate.key),
        value: new FormControl(translate.value),
        control: new FormControl(),
      }, { updateOn: "blur" });
    });

    this.controls = new FormArray(groups);
  }

  onTurnOnEditMode(index: number): void {
    const ctrlValue = this._crlsValue.toArray()[index];
    ctrlValue.toEditMode();
  }

  onUpdate(index: number) {
    const ctrlKey = this.getControl(index, 'key');
    const ctrlValue = this.getControl(index, 'value');
    if (ctrlValue.valid) {
      this.update.emit({
        key: ctrlKey.value,
        value: ctrlValue.value,
      })
    }
   }

  getControl(index: number, fieldName: string) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}

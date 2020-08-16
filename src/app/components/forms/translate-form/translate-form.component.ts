import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ta-translate-form',
  templateUrl: './translate-form.component.html',
  styleUrls: ['./translate-form.component.scss']
})
export class TranslateFormComponent implements OnInit {
  @Input() collection: any;

  displayedColumns = ["key", "value"];

  controls: FormArray;

  constructor() { }

  ngOnInit(): void {
    const groups = this.collection.map(translate => {
      return new FormGroup({
        position: new FormControl(translate.position),
        name: new FormControl(translate.name),
      }, { updateOn: "blur" });
    });

    this.controls = new FormArray(groups);
  }

  updateField(index: number, field: string) {
    const control = this.getControl(index, field);
    if (control.valid) {
      // this.core.update(index,field,control.value);
    }
   }

  getControl(index: number, fieldName: string) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}

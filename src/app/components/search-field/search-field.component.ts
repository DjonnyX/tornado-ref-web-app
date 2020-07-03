import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ta-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent extends BaseComponent implements OnInit, OnDestroy {
  
  form: FormGroup;

  ctrlSearch = new FormControl("");

  @Output() search = new EventEmitter<string>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      search: this.ctrlSearch,
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.search.emit(this.ctrlSearch.value);
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onClear(): void {
    this.ctrlSearch.setValue("");
  }
}

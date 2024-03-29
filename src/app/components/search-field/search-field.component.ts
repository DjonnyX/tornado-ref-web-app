import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LocalizationService } from '@app/services/localization/localization.service';
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

  @Input() fieldClass = "accent";

  @Output() search = new EventEmitter<string>();

  constructor(
    private _fb: FormBuilder,
    public readonly localization: LocalizationService,
  ) {
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

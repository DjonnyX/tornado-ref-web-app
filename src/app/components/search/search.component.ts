import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { interval } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ta-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit {
  @Input() placeholder: string;

  @Input() liveSearch: boolean = true;

  @Output() search = new EventEmitter<string>();

  form: FormGroup;

  ctrlSearch = new FormControl("");

  isFill = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: this.ctrlSearch,
    });

    this.form.valueChanges.subscribe(
      v => {
        const val = this.ctrlSearch.value;
        this.isFill = val && val.length > 0;

        if (this.liveSearch) {
          this.search.emit(val);
        }
      }
    );
  }

  clear(e: Event) {
    this.ctrlSearch.reset();
  }

  onSubmit() {
    if (this.liveSearch) {
      return;
    }

    this.search.emit(this.ctrlSearch.value);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ta-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string;

  @Input() liveSearch: boolean = true;

  @Output() search = new EventEmitter<string>();

  form: FormGroup;

  ctrlSearch = new FormControl("");

  isFocused = false;

  isHover = false;

  isFill = false;

  constructor() { }

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

  clear() {
    this.ctrlSearch.setValue("");
  }

  onOver() {
    this.isHover = true;
  }

  onOut() {
    this.isHover = false;
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  onSubmit() {
    if (this.liveSearch) {
      return;
    }

    this.search.emit(this.ctrlSearch.value);
  }
}

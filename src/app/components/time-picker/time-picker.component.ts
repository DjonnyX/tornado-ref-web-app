import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IRange {
  start: number;
  end: number;
}

@Component({
  selector: 'ta-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {
  @Input() isEdit: boolean = true;

  @Input() value: IRange = {
    start: 0,
    end: 86400000,
  };

  @Output() change = new EventEmitter<IRange>();

  constructor() { }

  ngOnInit(): void {
    this.onChange(this.value);
  }

  onChangeStart(val: number) {
    this.value.start = val;

    this.onChange(this.value);
  }

  onChangeEnd(val: number) {
    this.value.end = val;

    this.onChange(this.value);
  }

  onChange(val: IRange): void {
    this.change.emit(val);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const DAY_MS = 86400000;
const H_MS = 3600000;
const M_MS = 60000;

interface ITime {
  hours: number;
  minutes: number;
}

const extractTime = (t: number): ITime => {
  const hours = Math.floor(t / H_MS);
  const minutes = (t - hours * H_MS) / 60000;
  return {
    hours,
    minutes,
  }
}

const formatFigures = (v: number): string => {
  let result = String(v);

  while (result.length < 2) {
    result = `0${result}`;
  }

  return result;
}

@Component({
  selector: 'ta-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss']
})
export class TimeSelectComponent implements OnInit {
  hours: string = '00';
  minutes: string = '00';

  @Input() isEdit: boolean = true;

  private _value: number = 0;
  @Input() set value(v: number) {
    if (this._value !== v) {
      this._value = v;

      const t = extractTime(v);
      this.hours = formatFigures(t.hours);
      this.minutes = formatFigures(t.minutes);
    }
  }

  @Output() change = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  incH(): void {
    let v = this._value + H_MS;
    if (v > DAY_MS) {
      v = DAY_MS - v;
    }

    this.value = v;

    this.change.emit(this._value);
  }

  incM(): void {
    let v = this._value + M_MS;
    if (v > DAY_MS) {
      v = DAY_MS - v;
    }

    this.value = v;

    this.change.emit(this._value);
  }

  decH(): void {
    let v = this._value - H_MS;
    if (v < 0) {
      v = DAY_MS + v;
    }

    this.value = v;

    this.change.emit(this._value);
  }

  decM(): void {
    let v = this._value - M_MS;
    if (v < 0) {
      v = DAY_MS + v;
    }

    this.value = v;

    this.change.emit(this._value);
  }
}

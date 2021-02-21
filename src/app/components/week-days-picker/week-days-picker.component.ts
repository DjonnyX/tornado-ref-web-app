import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface IWeekDay {
  name: string;
  shortName: string;
  selected?: boolean;
}

@Component({
  selector: 'ta-week-days-picker',
  templateUrl: './week-days-picker.component.html',
  styleUrls: ['./week-days-picker.component.scss']
})
export class WeekDaysPickerComponent implements OnInit {

  readonly weekDays: Array<IWeekDay> = [
    {
      name: "Sunday",
      shortName: "SUN",
    },
    {
      name: "Monday",
      shortName: "MON",
    },
    {
      name: "Tuesday",
      shortName: "TUE",
    },
    {
      name: "Wednesday",
      shortName: "WED",
    },
    {
      name: "Thursday",
      shortName: "THU",
    },
    {
      name: "Friday",
      shortName: "FRI",
    },
    {
      name: "Saturday",
      shortName: "SAT",
    },
  ];

  private _valueDictionary: { [key: string]: number } = {};

  @Input() set default(v: Array<number>) {
    this._valueDictionary = {};

    v.forEach(day => {
      this._valueDictionary[day] = day;
    });

    this.weekDays.forEach((day, index) => {
      day.selected = this._valueDictionary[index] !== undefined;
    });
  }

  @Input() isEdit: boolean = false;

  @Output() change = new EventEmitter<Array<number>>();

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(day: IWeekDay) {
    day.selected = !day.selected;

    this.emitChangeValue();
  }

  private emitChangeValue(): void {
    const value = new Array<number>();
    this.weekDays.forEach((day, index) => {
      if (day.selected) {
        value.push(index);
      }
    });

    this.change.emit(value);
  }
}

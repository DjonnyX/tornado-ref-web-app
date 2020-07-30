import { Component, OnInit } from '@angular/core';
import { ISchedule } from '@djonnyx/tornado-types';
import { IScheduleTimeRange } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  private _value: Array<ISchedule> = [];

  get value() {
    return this._value;
  }

  constructor() { }

  ngOnInit(): void { }

  setValue(value: Array<ISchedule>): void {
    // объект должен быть уникальным
    this._value = value.map(v => ({ time: { ...v.time }, weekDays: [...v.weekDays] }));
  }

  onCreate(): void {
    this._value.push({
      time: {
        start: undefined,
        end: undefined,
      },
      weekDays: [],
    })
  }

  onDelete(schedule: ISchedule): void {
    const index = this._value.indexOf(schedule);

    if (index > -1) {
      this._value.splice(index, 1);
    }
  }

  onTimeRangeChange(schedule: ISchedule, value: IScheduleTimeRange): void {
    schedule.time = value;
  }

  onWeekDaysChange(schedule: ISchedule, value: Array<number>): void {
    schedule.weekDays = value;
  }
}

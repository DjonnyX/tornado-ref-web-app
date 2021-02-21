import { Component, Input, OnInit } from '@angular/core';
import { ISchedule } from '@djonnyx/tornado-types';
import { IScheduleTimeRange } from '@djonnyx/tornado-types';
import { scheduled } from 'rxjs';

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

  @Input() isEdit: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  setValue(value: Array<ISchedule>): void {
    // объект должен быть уникальным
    this._value = value.map(v => (
      {
        active: v.active,
        time: { ...v.time },
        weekDays: [...v.weekDays],
        extra: v.extra,
      }
    ));
  }

  onCreate(): void {
    this._value = this._value.map(v => ({...v}));
    this._value.push({
      active: true,
      time: {
        start: 0,
        end: 86400000,
      },
      weekDays: [],
    });
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

  onToggleActive(schedule: ISchedule): void {
    schedule.active = !schedule.active;
  }
}

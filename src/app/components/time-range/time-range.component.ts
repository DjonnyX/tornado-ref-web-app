import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerTheme, NgxMaterialTimepickerComponent } from "ngx-material-timepicker";
import { MatInput } from '@angular/material/input';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IScheduleTimeRange } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.scss']
})
export class TimeRangeComponent extends BaseComponent implements OnInit {
  @ViewChild("startTime", { static: true, read: MatInput }) private _startTime: MatInput;
  @ViewChild("endTime", { static: true, read: MatInput }) private _endTime: MatInput;
  @ViewChild("start", { static: true, read: NgxMaterialTimepickerComponent }) private _startPicker: NgxMaterialTimepickerComponent;
  @ViewChild("end", { static: true, read: NgxMaterialTimepickerComponent }) private _endPicker: NgxMaterialTimepickerComponent;

  readonly darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#36474f',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#435761',
    },
    clockFace: {
      clockFaceBackgroundColor: '#435761',
      clockHandColor: '#ffd740',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  @Input() set default(v: IScheduleTimeRange) {
    if (v.start) {
      const start = formatLongToTime(v.start);
      this._startTime.value = start;
      this._startPicker.defaultTime = start;
    }

    if (v.end) {
      const end = formatLongToTime(v.end);
      this._endTime.value = end;
      this._endPicker.defaultTime = end;
    }
  }

  @Output() change = new EventEmitter<IScheduleTimeRange>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._startTime.stateChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.emitChangeValue();
    });

    this._endTime.stateChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.emitChangeValue();
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  private emitChangeValue(): void {
    this.change.emit({
      start: formatTime(this._startTime.value),
      end: formatTime(this._endTime.value),
    });
  }
}

export const formatTime = (time: string): number => {
  if (time === undefined || time === null) {
    return 0;
  }

  const val = time.match(/([0-9]{1,2})/g);

  const h = !!val && val.length > 0 ? Number(val[0]) : 0;
  const m = !!val && val.length > 1 ? Number(val[1]) : 0;
  let value = h * 60 * 60 * 1000 + m * 60 * 1000;

  return value;
}

export const formatLongToTime = (time: number): string => {
  if (!time) {
    return "0:0";
  }

  const h = Math.floor(time / (60 * 60 * 1000));
  const m = String((time - h * 60 * 60 * 1000) / (60 * 1000));

  return `${h > 12 ? h - 12 : h}:${m.length < 2 ? '0' + m : m}`;
}
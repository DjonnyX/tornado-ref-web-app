import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerTheme, NgxMaterialTimepickerComponent } from "ngx-material-timepicker";
import { MatInput } from '@angular/material/input';
import { map, takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BaseComponent } from '@components/base/base-component';
import { IScheduleTimeRange } from '@djonnyx/tornado-types';

interface IState {
  start: string;
  end: string;
}

@Component({
  selector: 'ta-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.scss']
})
export class TimeRangeComponent extends BaseComponent implements OnInit {
  private _subscrStartTimeChanges: Subscription;
  private _subscrEndTimeChanges: Subscription;

  private _startTime: MatInput;
  @ViewChild("startTime", { static: true, read: MatInput }) set startTime(v: MatInput) {
    if (this._startTime !== v) {
      this._startTime = v;

      if (v) {
        this._startTime.value = this._state.start;

        this._subscrStartTimeChanges = this._startTime.stateChanges.pipe(
          map(start => {
            this._state = { ...this._state, start: this._startTime.value };
            return start;
          }),
          takeUntil(this.unsubscribe$),
        ).subscribe(() => {
          this.emitChangeValue();
        });
      } else {
        if (this._subscrStartTimeChanges) {
          this._subscrStartTimeChanges.unsubscribe();
          this._subscrStartTimeChanges = null;
        }
      }
    }
  }

  private _endTime: MatInput;
  @ViewChild("endTime", { static: true, read: MatInput }) set endTime(v: MatInput) {
    if (this._endTime !== v) {
      this._endTime = v;

      if (v) {
        this._endTime.value = this._state.end;

        this._subscrEndTimeChanges = this._endTime.stateChanges.pipe(
          map(end => {
            this._state = { ...this._state, end: this._startTime.value };
            return end;
          }),
          takeUntil(this.unsubscribe$),
        ).subscribe(() => {
          this.emitChangeValue();
        });
      } else {
        if (this._subscrEndTimeChanges) {
          this._subscrEndTimeChanges.unsubscribe();
          this._subscrEndTimeChanges = null;
        }
      }
    }
  }

  private _startPicker: NgxMaterialTimepickerComponent;
  @ViewChild("start", { static: true, read: NgxMaterialTimepickerComponent }) set startPicker(v: NgxMaterialTimepickerComponent) {
    if (this._startPicker !== v) {
      this._startPicker = v;

      this._startPicker.defaultTime = this._state.start;
    }
  };

  private _endPicker: NgxMaterialTimepickerComponent;
  @ViewChild("end", { static: true, read: NgxMaterialTimepickerComponent }) set endPicker(v: NgxMaterialTimepickerComponent) {
    if (this._endPicker !== v) {
      this._endPicker = v;

      this._endPicker.defaultTime = this._state.end;
    }
  };

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

  private _state: IState = {
    start: formatLongToTime(0),
    end: formatLongToTime(86400000),
  }

  get state() { return this._state; }

  private _isEdit = false;
  @Input() set isEdit(v: boolean) {
    if (this._isEdit !== v) {
      this._isEdit = v;

      if (this._startTime) {
        this._startTime.value = this._state.start;
      }
      if (this._startPicker) {
        this._startPicker.defaultTime = this._state.start;
      }
      if (this._endTime) {
        this._endTime.value = this._state.end;
      }
      if (this._endPicker) {
        this._endPicker.defaultTime = this._state.end;
      }
    }
  }
  get isEdit() { return this._isEdit; }

  @Input() set default(v: IScheduleTimeRange) {
    if (v.start) {
      const start = formatLongToTime(v.start);

      if (this._startTime) {
        this._startTime.value = start;
      }
      if (this._startPicker) {
        this._startPicker.defaultTime = start;
      }

      this._state = { ...this._state, start };
    }

    if (v.end) {
      const end = formatLongToTime(v.end);
      if (this._endTime) {
        this._endTime.value = end;
      }
      if (this._endPicker) {
        this._endPicker.defaultTime = end;
      }

      this._state = { ...this._state, end };
    }
  }

  @Output() change = new EventEmitter<IScheduleTimeRange>();

  constructor() {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    if (this._subscrStartTimeChanges) {
      this._subscrStartTimeChanges.unsubscribe();
      this._subscrStartTimeChanges = null;
    }
    if (this._subscrEndTimeChanges) {
      this._subscrEndTimeChanges.unsubscribe();
      this._subscrEndTimeChanges = null;
    }
  }

  private emitChangeValue(): void {
    this.change.emit({
      start: formatTime(this._state.start),
      end: formatTime(this._state.end),
    });
  }
}

const TIME_PATTERN = /([0-9]{1,2})/g;

export const formatTime = (time: string): number => {
  if (time === undefined || time === null) {
    return 0;
  }

  const val = time.match(TIME_PATTERN);

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
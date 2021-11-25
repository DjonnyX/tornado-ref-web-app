import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IPriceByDevicesData } from '../price-by-devices.component';

@Component({
  selector: 'ta-price-by-device-item',
  templateUrl: './price-by-device-item.component.html',
  styleUrls: ['./price-by-device-item.component.scss']
})
export class PriceByDeviceItemComponent extends BaseComponent implements OnInit {
  form: FormGroup;

  ctrlDevices = new FormControl(undefined, [Validators.required]);
  ctrlCost = new FormControl(undefined, [Validators.required]);

  private _data: IPriceByDevicesData;
  @Input() set data(v: IPriceByDevicesData) {
    if (this._data !== v) {
      this._data = v;

      this.ctrlCost.setValue((this._data?.cost || 0) * .01);
      this.ctrlDevices.setValue(this._data?.largeOrEqual);
    }
  }
  get data() { return this._data; }

  get valueChanges() { return this.form.valueChanges; }

  @Output() onChange = new EventEmitter<IPriceByDevicesData>();

  @Output() delete = new EventEmitter<IPriceByDevicesData>();

  constructor() {
    super();

    this.form = new FormGroup({
      largeOrEqual: this.ctrlDevices,
      cost: this.ctrlCost,
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(v => {
      this.onChange.emit({
        cost: (v.cost || 0) * 100,
        largeOrEqual: v.largeOrEqual,
      });
    });
  }

  onDelete(): void {
    this.delete.emit(this._data);
  }
}

import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import Color from "color";

@Component({
  selector: 'ta-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @ViewChild("input", { static: true }) private _input: ElementRef;

  @Input() colorPresets: Array<string>;

  get color() {
    return this._control?.value;
  }

  set color(v: string) {
    if (!!this._control) {
      this._control.setValue(v, {
        emitEvent: true,
        emitModelToViewChange: true,
        emitViewToModelChange: true,
      });
      this.resetInputValue();
    }
  }

  textColorClass: { [className: string]: boolean } = {};

  @Input() cpPosition: string = 'bottom';

  private _control: FormControl;
  @Input() set control(v: FormControl) {
    if (this._control !== v) {
      this._control = v;

      this.resetInputValue();
    }
  }
  get control() { return this._control; }

  @Input() resetButtonShow: boolean;

  @Input() resetButtonDisabled: boolean;

  @Output() reset = new EventEmitter<void>();

  @Output() change = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.resetInputValue();
  }

  onReset(): void {
    this.reset.emit();
  }

  onChange(): void {
    this.change.emit();
  }

  private resetInputValue(): void {
    (this._input.nativeElement as HTMLInputElement).value = this.control?.value;
    this.textColorClass = { [Color(this.control?.value).isLight() ? "dark" : "light"]: true };
  }
}

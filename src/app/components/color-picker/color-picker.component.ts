import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ta-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @ViewChild("input", { static: true }) private _input: ElementRef;

  get color() {
    return this.control.value;
  }

  set color(v: string) {
    this.control.setValue(v);
    this.resetInputValue();
  }

  @Input() cpPosition: string = 'top-right';

  @Input() control: FormControl;

  @Input() resetButtonShow: boolean;

  @Input() resetButtonDisabled: boolean;

  @Output() reset = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.resetInputValue();
  }

  onReset(): void {
    this.reset.emit();
  }

  private resetInputValue(): void {
    (this._input.nativeElement as HTMLInputElement).value = this.control.value;
  }
}

import { Component, forwardRef, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { getPropValue } from '@app/utils/props.util';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'ta-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
  }]
})
export class SelectComponent extends BaseComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() valuePropName: string = "id";

  @Input() displayValuePropName: string = "name";

  @Input() iconValuePropName: string = "icon";

  @Input() itemRenderer: TemplateRef<any>;

  @Input() items: Array<any>;

  listStyles: any = {};
  @Input() set position(v: "left" | "right") {
    this.listStyles = v === "left" ? {
      left: 0,
    } : {
      right: 0,
    }
  }

  ctrlInput: FormControl;

  selected: any;

  isExpanded: boolean = false;

  private _value: any;

  get value() {
    return this._value;
  }

  @Input()
  set value(val: any) {
    this._value = val;

    this.ctrlInput.setValue(val);

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: any) { }

  public readonly getPropValue = getPropValue;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.ctrlInput = new FormControl();

    this.ctrlInput.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(
      v => {
        this.isExpanded = false;
        this.onChangeModel();
      }
    );

    this.onChangeModel();
  }

  onExpand(): void {
    this.isExpanded = true;
  }

  onCollapse(): void {
    this.isExpanded = false;
  }

  onChangeModel() {
    this._value = this.ctrlInput.value;

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}

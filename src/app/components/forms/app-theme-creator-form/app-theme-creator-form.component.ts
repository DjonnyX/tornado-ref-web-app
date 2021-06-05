import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IAppTheme, IAsset } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { ICompiledTheme, IThemeDescriptior, IThemeDescriptorValue, ThemeDescriptiorKeyTypes, themeDescriptorPropsToThemeData } from '@app/utils/app-theme.util';
import Color from "color";
import { IFileUploadEvent } from '@models';

interface IData {
  name: IKeyValue;
  props: Array<IKeyValue>;
}

interface ICompiledThemeValue {
  name: string;
  value: IThemeDescriptorValue;
}

const descriptorToArray = (descriptor: IThemeDescriptior): Array<ICompiledThemeValue> => {
  const result = [];
  for (const keyName in descriptor) {
    result.push({
      name: keyName,
      value: descriptor[keyName],
    });
  }

  return result;
}

const descriptorToArrayControls = (form: FormGroup, descriptor: IThemeDescriptior): void => {
  for (const keyName in descriptor) {
    if (!form.contains(keyName)) {
      const control = new FormControl(descriptor[keyName].value);
      form.addControl(keyName, control);
    }
  }
}

const getColorPresets = (items: Array<ICompiledThemeValue>): Array<string> => {
  const result: Array<string> = [];
  for (let item of items) {
    if (item.value.type !== ThemeDescriptiorKeyTypes.COLOR) {
      continue;
    }

    const color = Color(item.value.value).string();
    if (result.indexOf(color) === -1) {
      result.push(color);
    }
  }

  return result;
}

const getColorPresetsFromControls = (controls: { [name: string]: AbstractControl }, descriptor: IThemeDescriptior,
  options?: { exclude?: Array<string> }): Array<string> => {
  const result: Array<string> = [];
  for (let controlName in controls) {
    if (!!options?.exclude && options?.exclude?.indexOf(controlName) !== -1) {
      continue;
    }

    const control = controls[controlName];

    if (descriptor[controlName]?.type === ThemeDescriptiorKeyTypes.COLOR) {
      const color = Color(control.value).string();
      if (result.indexOf(color) === -1) {
        result.push(color);
      }
    }
  }

  return result;
}

@Component({
  selector: 'ta-app-theme-creator-form',
  templateUrl: './app-theme-creator-form.component.html',
  styleUrls: ['./app-theme-creator-form.component.scss']
})
export class AppThemeCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {
  public readonly ThemeDescriptiorKeyTypes = ThemeDescriptiorKeyTypes;

  form: FormGroup = this._fb.group({});

  ctrlName = new FormControl('', [Validators.required]);

  @Input() resources: { [name: string]: string };

  @Input() assets: Array<IAsset>;

  private _compiledThemeArray: Array<ICompiledThemeValue>;

  get compiledThemeArray() { return this._compiledThemeArray; }

  private _colorPresets: Array<string>;
  get colorPresets() { return this._colorPresets; }

  private _compiledTheme: ICompiledTheme;
  @Input() set compiledTheme(compiledTheme: ICompiledTheme) {
    if (!!compiledTheme && this._compiledTheme !== compiledTheme) {
      this._compiledTheme = compiledTheme;
      this._compiledThemeArray = descriptorToArray(compiledTheme.descriptor);
      this._colorPresets = getColorPresets(this._compiledThemeArray);

      this.generateInfoData();

      this.ctrlName.setValue(compiledTheme.theme.name);
      descriptorToArrayControls(this.form, compiledTheme.descriptor);
    }
  }
  get compiledTheme(): ICompiledTheme {
    return this._compiledTheme;
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<IAppTheme>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IAppTheme>();

  @Output() uploadResource = new EventEmitter<IFileUploadEvent>();

  isEdit: boolean = false;

  private _data: IData;

  get data() {
    return this._data;
  }

  constructor(private _fb: FormBuilder) {
    super();

    this.form.addControl("name", this.ctrlName);
  }

  private generateInfoData(): void {
    if (!this._compiledTheme) {
      return;
    }

    this._data = {
      name: {
        key: "Название",
        value: this._compiledTheme?.theme?.name || ' ---',
      },
      props: this._compiledThemeArray.map(v => ({
        key: v.name,
        value: v.value.value || '---',
      })),
    };
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      // reset presets
      if (!!this._compiledTheme) {
        this._colorPresets = getColorPresetsFromControls(this.form.controls, this._compiledTheme.descriptor, {
          exclude: ["name"],
        });
      }

      this.update.emit(value);
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSave();
    }
  }

  onSave(): void {
    if (this.form.valid) {
      const resources = { ...this.resources };
      this.save.emit({
        ...this._compiledTheme?.theme,
        name: this.form.value["name"],
        data: themeDescriptorPropsToThemeData(this.form.value, {
          exclude: ["name"],
        }),
        resources,
      });

      this.isEdit = false;
    }
  }

  onResourceUpload(file: File): void {
    this.uploadResource.emit({ file, key: "thumbnail" });
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onEditCancel(): void {
    this.isEdit = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getControl(controlName: string): AbstractControl | undefined {
    return this.form.controls[controlName];
  }

  hasControlError(controlName: string, pattern: string): boolean {
    return this.form.get(controlName)?.hasError(pattern);
  };
}

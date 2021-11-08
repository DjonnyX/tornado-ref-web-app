import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IAppTheme, IAsset } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { ICompiledTheme, IThemeDescriptior, IThemeDescriptorValue, ThemeDescriptiorKeyTypes, themeDescriptorPropsToThemeData } from '@app/utils/app-theme.util';
import Color from "color";
import { IFileUploadEvent } from '@models';
import { LocalizationService } from '@app/services/localization/localization.service';

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
    } else {
      form.get(keyName)?.setValue(descriptor[keyName].value);
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

    if (descriptor[controlName]?.type === ThemeDescriptiorKeyTypes.COLOR) {
      const control = controls[controlName];
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

  ctrlName = new FormControl("", [Validators.required]);

  private _resources: { [name: string]: string };
  @Input() set resources(v: { [name: string]: string }) {
    if (this._resources !== v) {
      this._resources = v;
    }
  }
  get resources() { return this._resources; }

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;

      this.generateInfoData();
    }
  }
  get assets() { return this._assets; }

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

      this.ctrlName.setValue(compiledTheme.theme.name);
      descriptorToArrayControls(this.form, compiledTheme.descriptor);

      this.generateInfoData();
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

  @Output() deleteResource = new EventEmitter<string>();

  isEdit: boolean = false;

  private _data: IData;

  get data() {
    return this._data;
  }

  constructor(
    private _fb: FormBuilder,
    public readonly localization: LocalizationService,
  ) {
    super();

    this.form.addControl("name", this.ctrlName);
  }

  private generateInfoData(): void {
    if (!this._compiledTheme || !this._assets) {
      return;
    }

    this._data = {
      name: {
        key: "Название",
        value: this._compiledTheme?.theme?.name || ' ---',
      },
      props: this._compiledThemeArray.map(v => ({
        key: v.name,
        value: v.value.type === ThemeDescriptiorKeyTypes.ASSET ? this.getAsset(v.name)?.mipmap?.x32 : v.value.value?.toString() || '---',
      })),
    };
  }

  getAsset(key: string): IAsset | null {
    const res = this._compiledTheme.theme.resources[key];
    if (!!res) {
      return this._assets?.find(a => a.id === res);
    }

    return null;
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
    // if (this.form.valid) {
    const resources = { ...this._resources };
    this.save.emit({
      ...this._compiledTheme?.theme,
      name: this.form.value["name"],
      data: themeDescriptorPropsToThemeData(this.form.value, {
        exclude: ["name"],
      }),
      resources,
    });

    this.isEdit = false;
    // }
  }

  onResourceUpload(file: File, key: string): void {
    this.uploadResource.emit({ file, key });
  }

  onResourceDelete(key: string): void {
    this.deleteResource.emit(key);
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

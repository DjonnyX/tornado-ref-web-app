import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IAppTheme, IAsset } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { ICompiledTheme, IThemeDescriptior, IThemeDescriptorValue, ThemeDescriptiorKeyTypes } from '@app/utils/app-theme.util';

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

const descriptorToArrayControls = (descriptor: IThemeDescriptior): {
  [controlName: string]: AbstractControl,
} => {
  const result = {};
  for (const keyName in descriptor) {
    result[keyName] = new FormControl(descriptor[keyName]);
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

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  ctrlData: FormGroup;

  @Input() resources: { [name: string]: string };

  @Input() assets: Array<IAsset>;

  private _compiledThemeArray: Array<ICompiledThemeValue>;

  private _compiledTheme: ICompiledTheme;
  @Input() set compiledTheme(compiledTheme: ICompiledTheme) {
    if (compiledTheme) {
      this._compiledTheme = compiledTheme;
      this._compiledThemeArray = descriptorToArray(compiledTheme.descriptor);

      this.generateInfoData();

      this.ctrlName.setValue(compiledTheme.theme.name);
      this.ctrlData = new FormGroup(descriptorToArrayControls(compiledTheme.descriptor));
    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<IAppTheme>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IAppTheme>();

  @Output() uploadMainResource = new EventEmitter<File>();

  isEdit: boolean = false;

  private _data: IData;

  get data() {
    return this._data;
  }

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      data: this.ctrlData,
    });
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
      this.update.emit(value);
    })
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
      // if (!(resources as any).hasOwnProperty("main")) {
      //   resources.main = null;
      // }

      this.save.emit({
        ...this._compiledTheme?.theme,
        ...this.form.value,
        resources,
      });

      this.isEdit = false;
    }
  }

  onMainResourceUpload(file: File): void {
    this.uploadMainResource.emit(file);
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

  hasControlError(controlName: string, pattern: string): boolean {
    return this.form.get("data").get(controlName).hasError(pattern);
  };
}

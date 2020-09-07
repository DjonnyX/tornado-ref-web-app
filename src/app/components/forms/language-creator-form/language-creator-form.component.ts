import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ILanguage, ILanguageResources, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-language-creator-form',
  templateUrl: './language-creator-form.component.html',
  styleUrls: ['./language-creator-form.component.scss']
})
export class LanguageCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlCode = new FormControl('', [Validators.required]);

  ctrlName = new FormControl('', [Validators.required]);

  @Input() resources: ILanguageResources;

  @Input() assets: Array<IAsset>;

  private _language: ILanguage;
  @Input() set language(language: ILanguage) {
    if (language) {
      this._language = language;

      this.ctrlCode.setValue(language.code);
      this.ctrlName.setValue(language.name);
    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ILanguage>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ILanguage>();

  @Output() uploadMainResource = new EventEmitter<File>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
      code: this.ctrlCode,
    })
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
      const resources: ILanguageResources = {...this.resources};
      if (!(resources as any).hasOwnProperty("main")) {
        resources.main = null;
      }

      this.save.emit({
        ...this._language,
        ...this.form.value,
        resources,
        active: !!this._language && this._language.active !== undefined ? this._language.active : true,
        extra: !!this._language ? this._language.extra : {},
      });
    }
  }

  onMainResourceUpload(file: File): void {
    this.uploadMainResource.emit(file);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { ILanguage, IAsset, ICurrency, ILanguageContents, ILanguageContentsItem } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';

@Component({
  selector: 'ta-language-creator-form',
  templateUrl: './language-creator-form.component.html',
  styleUrls: ['./language-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlCode = new FormControl('', [Validators.required]);

  @Input() assets: Array<IAsset>;

  private _defaultLanguage: ILanguage;
  @Input() set defaultLanguage(v: ILanguage) {
    if (this._defaultLanguage !== v) {
      this._defaultLanguage = v;

      this.sortLanguages();
    }
  }

  get defaultLanguage() { return this._defaultLanguage; }

  private _languages: Array<ILanguage>;
  @Input() set languages(v: Array<ILanguage>) {
    if (this._languages !== v) {
      this._languages = v;

      this.sortLanguages();
    }
  }

  get languages() { return this._languages; }

  sortedLanguages: Array<ILanguage>;

  private _language: ILanguage;
  @Input() set language(language: ILanguage) {
    if (language) {
      this._language = language;

      this.ctrlCode.setValue(this._language.code);

      this._state = { ...this._state, ...(this._language ? this._language.contents : undefined) };
    }
  }

  get language() {
    return this._language;
  }

  @Input() currencies: Array<ICurrency>;

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ILanguage>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ILanguage>();

  @Output() uploadMainImage = new EventEmitter<IFileUploadEvent>();

  @Output() uploadThumbnailImage = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconImage = new EventEmitter<IFileUploadEvent>();

  private _state: ILanguageContents = {};

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      code: this.ctrlCode,
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
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
      this.save.emit({
        ...this._language,
        ...this.form.value,
        contents: { ...(!!this._language ? this._language.contents : undefined), ...this._state },
        active: !!this._language && this._language.active !== undefined ? this._language.active : true,
        extra: !!this._language ? this._language.extra : {},
      });
    }
  }

  onMainImageUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadMainImage.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getContent(lang: ILanguage): ILanguageContentsItem {
    return this._language.contents[lang.code];
  }

  updateStateFor(state: ILanguageContents, lang: ILanguage): void {
    const mergedState: ILanguageContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
    this.updateState(mergedState);
  }

  private sortLanguages(): void {
    if (!this._languages || !this._defaultLanguage) {
      return;
    }

    const languages = new Array<ILanguage>();
    this._languages.forEach(lang => {
      if (lang.code === this._defaultLanguage.code) {
        languages.unshift(lang);
      } else {
        languages.push(lang);
      }
    });

    this.sortedLanguages = languages;
  }

  private updateState(state: ILanguageContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { ISelector, ITag, IAsset, ICurrency, IPrice, ISelectorContents, ISelectorContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent, IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';

@Component({
  selector: 'ta-selector-creator-form',
  templateUrl: './selector-creator-form.component.html',
  styleUrls: ['./selector-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

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

  private _selector: ISelector;
  @Input() set selector(selector: ISelector) {
    if (selector) {
      this._selector = selector;

      this._state = { ...this._state, ...(this._selector ? this._selector.contents : undefined) };
    }
  }

  get selector() {
    return this._selector;
  }

  @Input() resourcesGallery: Array<{ [lang: string]: IAsset }>;

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ISelector>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ISelector>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEvent>();

  private _state: ISelectorContents = {};

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({})
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
        ...this._selector,
        ...this.form.value,
        contents: { ...(!!this._selector ? this._selector.contents : undefined), ...this._state },
        active: !!this._selector && this._selector.active !== undefined ? this._selector.active : true,
        extra: !!this._selector ? this._selector.extra : {},
      });
    }
  }

  onMainResourceUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadMainResource.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
  }

  onIconResourceUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadIconResource.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getContent(lang: ILanguage): ISelectorContentsItem {
    return this._selector.contents[lang.code];
  }

  updateStateFor(state: ISelectorContents, lang: ILanguage): void {
    const mergedState: ISelectorContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: ISelectorContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

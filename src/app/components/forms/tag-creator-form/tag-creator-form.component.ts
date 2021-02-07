import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { ITag, IAsset, ITagContents, ITagContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';

@Component({
  selector: 'ta-tag-creator-form',
  templateUrl: './tag-creator-form.component.html',
  styleUrls: ['./tag-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

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

  private _tag: ITag;
  @Input() set tag(tag: ITag) {
    if (tag) {
      this._tag = tag;

      this._state = { ...this._state, ...(this._tag ? this._tag.contents : undefined) };
    }
  }

  get tag() {
    return this._tag;
  }

  @Input() isEditMode: boolean;

  isEdit: boolean = false;

  @Output() save = new EventEmitter<ITag>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ITag>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadThumbnailResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEvent>();

  private _state: ITagContents = {};

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({});
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
        ...this._tag,
        ...this.form.value,
        contents: { ...(!!this._tag ? this._tag.contents : undefined), ...this._state },
        active: !!this._tag && this._tag.active !== undefined ? this._tag.active : true,
        extra: !!this._tag ? this._tag.extra : {},
      });

      this.isEdit = false;
    }
  }

  onMainResourceUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadMainResource.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
  }

  onThumbnailResourceUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadThumbnailResource.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
  }

  onIconResourceUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadIconResource.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
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

  getContent(lang: ILanguage): ITagContentsItem {
    return this._tag.contents[lang.code];
  }

  updateStateFor(state: ITagContents, lang: ILanguage): void {
    const mergedState: ITagContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: ITagContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

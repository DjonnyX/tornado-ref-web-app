import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { IOrderType, IAsset, ICurrency, IOrderTypeContents, IOrderTypeContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent, IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';

@Component({
  selector: 'ta-order-type-creator-form',
  templateUrl: './order-type-creator-form.component.html',
  styleUrls: ['./order-type-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypeCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

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

  private _orderType: IOrderType;
  @Input() set orderType(orderType: IOrderType) {
    if (orderType) {
      this._orderType = orderType;

      this._state = { ...this._state, ...(this._orderType ? this._orderType.contents : undefined) };
    }
  }

  get orderType() {
    return this._orderType;
  }

  @Input() currencies: Array<ICurrency>;

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<IOrderType>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IOrderType>();

  @Output() uploadMainImage = new EventEmitter<IFileUploadEvent>();

  @Output() uploadThumbnailImage = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconImage = new EventEmitter<IFileUploadEvent>();

  private _state: IOrderTypeContents = {};

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
        ...this._orderType,
        ...this.form.value,
        contents: { ...(!!this._orderType ? this._orderType.contents : undefined), ...this._state },
        active: !!this._orderType && this._orderType.active !== undefined ? this._orderType.active : true,
        extra: !!this._orderType ? this._orderType.extra : {},
      });
    }
  }

  onMainImageUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadMainImage.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
  }

  onIconImageUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadIconImage.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getContent(lang: ILanguage): IOrderTypeContentsItem {
    return this._orderType.contents[lang.code];
  }

  updateStateFor(state: IOrderTypeContents, lang: ILanguage): void {
    const mergedState: IOrderTypeContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: IOrderTypeContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

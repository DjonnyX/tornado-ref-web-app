import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { IProduct, ITag, IAsset, ICurrency, IPrice, IProductContents, IProductContentsItem, ILanguage, ITagContentsItem } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent, IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { deepMergeObjects } from '@app/utils/object.util';

@Component({
  selector: 'ta-product-creator-form',
  templateUrl: './product-creator-form.component.html',
  styleUrls: ['./product-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlTags = new FormControl([]);

  ctrlPrices = new FormControl([]);

  ctrlReceipt = new FormControl([]);

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

  private _product: IProduct;
  @Input() set product(product: IProduct) {
    if (product) {
      this._product = product;

      this._state = { ...this._state, ...(this._product ? this._product.contents : undefined) };

      this.ctrlTags.setValue(product.tags);
      this.ctrlPrices.setValue(product.prices);
      // this.ctrlReceipt.setValue(product.receipt);
    }
  }

  get product() {
    return this._product;
  }

  @Input() resourcesGallery: Array<{ [lang: string]: IAsset }>;

  @Input() currencies: Array<ICurrency>;

  @Input() isEditMode: boolean;

  @Input() tagList: Array<ITag>;

  @Output() save = new EventEmitter<IProduct>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IProduct>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadThumbnailResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadAsset = new EventEmitter<IFileUploadEvent>();

  @Output() updateAsset = new EventEmitter<IAssetUploadEvent>();

  @Output() deleteAsset = new EventEmitter<IAssetUploadEvent>();

  private _state: IProductContents = {};

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      tags: this.ctrlTags,
      prices: this.ctrlPrices,
      receipt: this.ctrlReceipt,
    })
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

  getTagContent(tag: ITag): ITagContentsItem {
    return tag?.contents[this.defaultLanguage.code];
  }

  getTagColor(tag: ITag): string {
    const tagContent = this.getTagContent(tag);
    return tagContent?.color || "";
  }

  getTagName(tag: ITag): string {
    const tagContent = this.getTagContent(tag);
    return tagContent?.name || "";
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
        ...this._product,
        ...this.form.value,
        contents: { ...(!!this._product ? this._product.contents : undefined), ...this._state },
        active: !!this._product && this._product.active !== undefined ? this._product.active : true,
        extra: !!this._product ? this._product.extra : {},
      });
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

  onAssetUpload(file: File, lang: ILanguage): void {
    this.uploadAsset.emit({ file, langCode: lang.code });
  }

  onAssetUpdate(asset: IAsset, lang: ILanguage): void {
    this.updateAsset.emit({ asset, langCode: lang.code });
  }

  onAssetDelete(asset: IAsset, lang: ILanguage): void {
    this.deleteAsset.emit({ asset, langCode: lang.code });
  }

  onChangePrices(prices: Array<IPrice>): void {
    this.ctrlPrices.setValue(prices);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getContent(lang: ILanguage): IProductContentsItem {
    return this._product.contents[lang.code];
  }

  getResourcesGallery(lang: ILanguage): Array<IAsset> {
    return !!lang && !!this.resourcesGallery && this.resourcesGallery[lang.code] ? this.resourcesGallery[lang.code] : [];
  }

  updateStateFor(state: IProductContents, lang: ILanguage): void {
    const mergedState: IProductContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: IProductContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

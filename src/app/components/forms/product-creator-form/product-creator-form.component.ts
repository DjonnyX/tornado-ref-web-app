import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import {
  IProduct, ITag, IAsset, ICurrency, IPrice, IProductContents, IProductContentsItem,
  ILanguage, ITagContentsItem, ISystemTag
} from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent, IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { deepEqual, deepMergeObjects } from '@app/utils/object.util';
import { IKeyValue } from '@components/key-value/key-value.component';
import { getMapOfCollection, ICollectionDictionary } from '@app/utils/collection.util';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStoreRequest } from '@store/interfaces/store-request.interface';

interface IData {
  tags: IKeyValue;
  prices: IKeyValue;
  systemTag: IKeyValue;
  weight: IKeyValue;
}

@Component({
  selector: 'ta-product-creator-form',
  templateUrl: './product-creator-form.component.html',
  styleUrls: ['./product-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlTags = new FormControl([]);

  ctrlSystemTag = new FormControl();

  ctrlWeight = new FormControl(0);

  ctrlPrices = new FormControl([]);

  ctrlReceipt = new FormControl([]);

  @Input() assets: Array<IAsset>;

  private _previousSystemTags: Array<ISystemTag> = [];

  private _systemTags$ = new BehaviorSubject<Array<ISystemTag>>([]);
  systemTags$ = this._systemTags$.asObservable();
  private _systemTags: Array<ISystemTag> = [];
  @Input() set systemTags(v: Array<ISystemTag>) {
    if (this._systemTags !== v) {
      this._previousSystemTags = this._systemTags?.length ? [...this._systemTags] : undefined;
      this._systemTags = v;

      if (!!this._previousSystemTags && this._previousSystemTags.length < this._systemTags.length) {
        this.autoSelectSystemTag(null, true);
      }

      this.generateData();

      this._systemTags$.next(v);
    }
  }
  get systemTags() { return this._systemTags; }

  private _defaultLanguage: ILanguage;
  @Input() set defaultLanguage(v: ILanguage) {
    if (this._defaultLanguage !== v) {
      this._defaultLanguage = v;

      this.sortLanguages();

      this.generateData();
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
    if (!!product && this._product !== product) {
      this._product = product;

      this._state = { ...this._state, ...(this._product ? this._product.contents : undefined) };

      this.generateData();

      this.ctrlTags.setValue(product.tags);
      this.ctrlSystemTag.setValue(product.systemTag);
      this.ctrlWeight.setValue(product.weight || 0);
      this.ctrlPrices.setValue(product.prices);
      // this.ctrlReceipt.setValue(product.receipt);

      this.resetInitState();
      this.checkDirty();
    }
  }

  get product() {
    return this._product;
  }

  isEdit: boolean = false;

  @Input() resourcesGallery: Array<{ [lang: string]: IAsset }>;

  private _currenciesDictionary: ICollectionDictionary<ICurrency>;

  private _currencies: Array<ICurrency>;
  @Input() set currencies(v: Array<ICurrency>) {
    if (this._currencies !== v) {
      this._currencies = v;

      this._currenciesDictionary = !!v ? getMapOfCollection(v, "id") : {};

      this.generateData();
    }
  }

  get currencies() { return this._currencies; }

  @Input() isEditMode: boolean;

  private _tagsDictionary: ICollectionDictionary<ITag>;

  private _tagList: Array<ITag>;
  @Input() set tagList(v: Array<ITag>) {
    if (this._tagList !== v) {
      this._tagList = v;

      this._tagsDictionary = !!v ? getMapOfCollection(v, "id") : {};

      this.generateData();
    }
  }
  get tagList() { return this._tagList; }

  @Output() save = new EventEmitter<IProduct>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IProduct>();

  @Output() createSystemTag = new EventEmitter<ISystemTag>();

  @Output() deleteSystemTag = new EventEmitter<IStoreRequest<{ id: string }, string>>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadAsset = new EventEmitter<IFileUploadEvent>();

  @Output() updateAsset = new EventEmitter<IAssetUploadEvent>();

  @Output() deleteAsset = new EventEmitter<IAssetUploadEvent>();

  private _state: IProductContents = {};

  private _data: IData;

  get data() {
    return this._data;
  }

  private _initState: any;

  private _isDirty = false;
  get isDirty() { return this._isDirty; }

  systemTagsFilteredOptions$: Observable<Array<ISystemTag>>;

  systemTagsDisplayFn = (value: string): string => {
    return this.systemTags?.find(t => t.id === value)?.name || value;
  }

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    super();

    this.form = this._fb.group({
      tags: this.ctrlTags,
      systemTag: this.ctrlSystemTag,
      weight: this.ctrlWeight,
      prices: this.ctrlPrices,
      receipt: this.ctrlReceipt,
    });
  }

  private generateData(): void {
    if (!this._product || !this._tagsDictionary || !this._currenciesDictionary ||
      !this._defaultLanguage || !this._systemTags) {
      return;
    }

    this._data = {
      tags: {
        key: "Тэги",
        value: this._product?.tags?.length > 0
          ? this._product?.tags.
            filter(t => !!this._tagsDictionary[t]).
            map(t => this.getTagName(this._tagsDictionary[t])).
            join(", ")
          : ' ---',
      },
      prices: {
        key: "Цена",
        value: this._product?.prices?.length > 0
          ? this.getPrices()
          : ' ---',
      },
      systemTag: {
        key: "Группа товаров (системный тэг)*",
        value: this.systemTagsDisplayFn(this._product.systemTag),
      },
      weight: {
        key: "Вес",
        value: `${this._product?.weight || 0}г`,
      },
    };
  }

  getPrices(): string {
    let result = "";

    this._product?.prices?.forEach((p, i) => {
      if (!!this._currenciesDictionary[p.currency]) {
        if (i > 0) {
          result += "; ";
        }

        result += `${((p.value || 0) * 0.01).toFixed(0)}${this._currenciesDictionary[p.currency]?.symbol}`;
      }
    });

    return result;
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
      this.checkDirty();
    });

    this.ctrlSystemTag.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(100),
    ).subscribe(v => {
      this.autoSelectSystemTag(v);
    });

    this.systemTagsFilteredOptions$ = this.systemTags$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(items => {
        return this.ctrlSystemTag.valueChanges.pipe(
          startWith(""),
          map(name => name ? this._systemTagsFilter(name) : this.systemTags ? [... this.systemTags] : []),
        );
      }),
    );

    this.resetInitState();
  }

  private getSelectedSystemTag() {
    const systemTagInput = this.ctrlSystemTag.value;
    return this.systemTags.find(t => t.name.toLowerCase() === systemTagInput?.toLowerCase() || t.id === systemTagInput);
  }

  private getRawValue() {
    const systemTag = this.getSelectedSystemTag();

    const result = this.form.getRawValue();
    result.systemTag = systemTag?.id;

    if (!this.ctrlSystemTag.value) {
      result.systemTag = undefined;
    }

    return result;
  }

  private autoSelectSystemTag(value?: string, selectLast: boolean = false): void {
    if (!value) {
      return;
    }

    let systemTag: ISystemTag;
    if (!selectLast) {
      if (!!value) {
        systemTag = this.systemTags.find(t => t.name.toLowerCase() == value.toLowerCase() || t.id == value)
      } else {
        systemTag = this._systemTags.length ? this._systemTags[this._systemTags.length - 1] : null;
      }
    } else {
      systemTag = this._systemTags.length ? this._systemTags[this._systemTags.length - 1] : null;
    }

    if (!systemTag && !this.ctrlSystemTag.value) {
      this.ctrlSystemTag.setValue(undefined);
      return;
    }

    if (!!systemTag?.id && systemTag?.id != this.ctrlSystemTag.value) {
      this.ctrlSystemTag.setValue(systemTag?.id);
    }
  }

  isExistsSystemTag() {
    const systemTagInput = this.ctrlSystemTag.value;
    return !!this.systemTags.find(t => t.name.toLowerCase() === systemTagInput?.toLowerCase() || t.id === systemTagInput);
  }

  onSystemTagSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onCreateNewSystemTag();
    }
  }

  onRemoveSystemTag() {
    this.ctrlSystemTag.setValue(null);
  }

  onCreateSystemTag() {
    this.onCreateNewSystemTag();
  }

  private onCreateNewSystemTag(): void {
    if (!this.isExistsSystemTag() && this.ctrlSystemTag.value) {
      this.createSystemTag.emit({
        name: this.ctrlSystemTag.value,
        extra: {
          entity: "product",
        },
      });
    }
  }

  onDeleteSystemTag(event: Event, id: string): void {
    if (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    this.deleteSystemTag.emit({
      params: {
        id,
      },
      callback: (err, id: string) => {
        if (!!err) {
          return;
        }

        if (this.ctrlSystemTag.value == id) {
          this.onRemoveSystemTag();
          this.onSave();
        }
      },
    });
  }

  private _systemTagsFilter(name: string): ISystemTag[] {
    const filterValue = name.toLowerCase();

    return this.systemTags?.filter(option => option?.name?.toLowerCase().indexOf(filterValue) === 0);
  }

  onConfirmSave(handler: Function): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Сохранить изменения?",
          message: "Описание содержит несохраненные изменения. Сохранить?",
          buttons: {
            confirm: {
              label: "Да",
            }
          }
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.onSave();
      }
      handler();
    });
  }

  getState() {
    const state = {
      ...this._product,
      ...this.getRawValue(),
      contents: { ...(!!this._product ? this._product.contents : undefined), ...this._state },
      active: !!this._product && this._product.active !== undefined ? this._product.active : true,
      extra: !!this._product ? this._product.extra : {},
    };

    if (!state.systemTag) {
      state.systemTag = null;
    }

    return state;
  }

  resetInitState() {
    this._initState = this.getState();
  }

  getTagContent(tag: ITag): ITagContentsItem {
    return !!this._defaultLanguage ? tag?.contents[this._defaultLanguage.code] : undefined;
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
      this.save.emit(this.getState());

      this.isEdit = false;
      this.resetInitState();
      this.checkDirty();
    }
  }

  checkDirty() {
    const newState = this.getState();

    this._isDirty = !deepEqual(this._initState, newState);
  }

  onMainResourceUpload(e: IFileUploadEntityEvent, lang: ILanguage): void {
    this.uploadMainResource.emit({ file: e.file, dataField: e.dataField, langCode: lang.code });
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
    this.checkDirty();
  }

  onChangeTags(): void {
    this._isDirty = true;
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

  getContent(lang: ILanguage): IProductContentsItem {
    return this._product.contents[lang.code];
  }

  getResourcesGallery(lang: ILanguage): Array<IAsset> {
    return !!lang && !!this.resourcesGallery && this.resourcesGallery[lang.code] ? this.resourcesGallery[lang.code] : [];
  }

  updateStateFor(state: IProductContents, lang: ILanguage): void {
    const mergedState: IProductContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
    this.updateState(mergedState);
    this.checkDirty();
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

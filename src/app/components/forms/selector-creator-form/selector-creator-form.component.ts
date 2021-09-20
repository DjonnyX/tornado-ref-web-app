import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { ISelector, IAsset, ISelectorContents, ISelectorContentsItem, ILanguage, ISystemTag } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepEqual, deepMergeObjects } from '@app/utils/object.util';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { Observable } from 'rxjs/internal/Observable';
import { IKeyValue } from '@components/key-value/key-value.component';
import { BehaviorSubject } from 'rxjs';
import { IStoreRequest } from '@store/interfaces/store-request.interface';

interface IData {
  systemTag: IKeyValue;
}

@Component({
  selector: 'ta-selector-creator-form',
  templateUrl: './selector-creator-form.component.html',
  styleUrls: ['./selector-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectorCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlSystemTag = new FormControl();

  @Input() assets: Array<IAsset>;

  private _previousSystemTags: Array<ISystemTag>;

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

      this.generateData();
    }
  }

  get languages() { return this._languages; }

  sortedLanguages: Array<ILanguage>;

  private _selector: ISelector;
  @Input() set selector(selector: ISelector) {
    if (selector) {
      this._selector = selector;

      this._state = { ...this._state, ...(this._selector ? this._selector.contents : undefined) };

      this.generateData();

      this.ctrlSystemTag.setValue(selector.systemTag);
    }
  }

  get selector() {
    return this._selector;
  }

  @Input() resourcesGallery: Array<{ [lang: string]: IAsset }>;

  @Input() isEditMode: boolean;

  isEdit: boolean = false;

  @Output() save = new EventEmitter<ISelector>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ISelector>();

  @Output() createSystemTag = new EventEmitter<ISystemTag>();

  @Output() deleteSystemTag = new EventEmitter<IStoreRequest<{ id: string }, string>>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEvent>();

  private _state: ISelectorContents = {};

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

  constructor(private _fb: FormBuilder, public dialog: MatDialog) {
    super();

    this.form = this._fb.group({
      systemTag: this.ctrlSystemTag,
    });
  }

  private generateData(): void {
    if (!this._selector || !this._defaultLanguage || !this._systemTags) {
      return;
    }

    this._data = {
      systemTag: {
        key: "Системный тэг",
        value: this.systemTagsDisplayFn(this._selector.systemTag),
      },
    };
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
          entity: this._selector.type,
        },
      })
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
      ...this._selector,
      ...this.getRawValue(),
      contents: { ...(!!this._selector ? this._selector.contents : undefined), ...this._state },
      active: !!this._selector && this._selector.active !== undefined ? this._selector.active : true,
      extra: !!this._selector ? this._selector.extra : {},
    };

    if (!state.systemTag) {
      state.systemTag = null;
    }

    return state;
  }

  resetInitState() {
    this._initState = this.getState();
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

  onEdit(): void {
    this.isEdit = true;
  }

  onEditCancel(): void {
    this.isEdit = false;
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

  private updateState(state: ISelectorContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

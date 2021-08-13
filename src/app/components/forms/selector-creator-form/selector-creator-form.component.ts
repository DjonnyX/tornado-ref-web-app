import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { ISelector, ITag, IAsset, ICurrency, IPrice, ISelectorContents, ISelectorContentsItem, ILanguage, ISystemTag } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent, IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { deepEqual, deepMergeObjects } from '@app/utils/object.util';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { Observable } from 'rxjs/internal/Observable';
import { IKeyValue } from '@components/key-value/key-value.component';

interface IData {
  systemTag: IKeyValue;
}

@Component({
  selector: 'ta-selector-creator-form',
  templateUrl: './selector-creator-form.component.html',
  styleUrls: ['./selector-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlSystemTag = new FormControl();

  @Input() assets: Array<IAsset>;

  private _systemTags: Array<ISystemTag>;
  @Input() set systemTags(v: Array<ISystemTag>) {
    if (!!v && this._systemTags !== v) {
      this._systemTags = v;

      if (this.ctrlSystemTag?.value !== undefined) {
        const ctrlSystemTagsValue = this.ctrlSystemTag.value?.toLowerCase();
        const selectedSystemTag = this._systemTags?.find(t => t.name.toLocaleLowerCase() === ctrlSystemTagsValue ||
          t.id.toLocaleLowerCase() === ctrlSystemTagsValue);
        this.ctrlSystemTag.setValue(!!selectedSystemTag ? this.ctrlSystemTag?.value : undefined);
      }

      this.generateData();
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

  @Output() deleteSystemTag = new EventEmitter<string>();

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

  systemTagsFilteredOptions: Observable<Array<ISystemTag>>;

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

    this.systemTagsFilteredOptions = this.ctrlSystemTag.valueChanges.pipe(
      startWith(""),
      map(name => name ? this._systemTagsFilter(name) : [...(this.systemTags || [])]),
    );

    this.resetInitState();
  }

  onSystemTagSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      if (!this.systemTags.find(t => t.name.toLocaleLowerCase() === this.ctrlSystemTag?.value?.toLowerCase())) {
        this.createSystemTag.emit({
          name: this.ctrlSystemTag.value,
          extra: {
            entity: this._selector.type,
          },
        })
      }
    }
  }

  onDeleteSystemTag(event: Event, id: string): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.deleteSystemTag.emit(id);
  }

  private _systemTagsFilter(name: string): ISystemTag[] {
    const filterValue = name.toLowerCase();

    return this.systemTags?.filter(option => option?.name?.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
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

  resetInitState() {
    this._initState = {
      ...this._selector,
      ...this.form.value,
      contents: { ...(!!this._selector ? this._selector.contents : undefined), ...this._state },
      active: !!this._selector && this._selector.active !== undefined ? this._selector.active : true,
      extra: !!this._selector ? this._selector.extra : {},
    };
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

      this.isEdit = false;
      this.resetInitState();
      this.checkDirty();
    }
  }

  checkDirty() {
    const newState = {
      ...this._selector,
      ...this.form.value,
      contents: { ...(!!this._selector ? this._selector.contents : undefined), ...this._state },
      active: !!this._selector && this._selector.active !== undefined ? this._selector.active : true,
      extra: !!this._selector ? this._selector.extra : {},
    };

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

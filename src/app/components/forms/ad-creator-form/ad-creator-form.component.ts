import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAd, IAsset, IAdContents, IAdContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepEqual, deepMergeObjects } from '@app/utils/object.util';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ta-ad-creator-form',
  templateUrl: './ad-creator-form.component.html',
  styleUrls: ['./ad-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

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

  private _ad: IAd;
  @Input() set ad(ad: IAd) {
    if (ad) {
      this._ad = ad;

      this._state = { ...this._state, ...(this._ad ? this._ad.contents : undefined) };
    }
  }

  get ad() {
    return this._ad;
  }

  @Input() resourcesGallery: Array<{ [lang: string]: IAsset }>;

  @Input() isEditMode: boolean;

  isEdit: boolean = false;

  @Output() save = new EventEmitter<IAd>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IAd>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadThumbnailResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEvent>();

  private _state: IAdContents = {};

  private _initState: any;

  private _isDirty = false;
  get isDirty() { return this._isDirty; }

  constructor(private _fb: FormBuilder, public dialog: MatDialog) {
    super();

    this.form = this._fb.group({})
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
      this.checkDirty();
    });

    this.resetInitState();
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
      ...this._ad,
      ...this.form.value,
      contents: { ...(!!this._ad ? this._ad.contents : undefined), ...this._state },
      active: !!this._ad && this._ad.active !== undefined ? this._ad.active : true,
      extra: !!this._ad ? this._ad.extra : {},
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
        ...this._ad,
        ...this.form.value,
        contents: { ...(!!this._ad ? this._ad.contents : undefined), ...this._state },
        active: !!this._ad && this._ad.active !== undefined ? this._ad.active : true,
        extra: !!this._ad ? this._ad.extra : {},
      });

      this.isEdit = false;
      this.resetInitState();
      this.checkDirty();
    }
  }

  checkDirty() {
    const newState = {
      ...this._ad,
      ...this.form.value,
      contents: { ...(!!this._ad ? this._ad.contents : undefined), ...this._state },
      active: !!this._ad && this._ad.active !== undefined ? this._ad.active : true,
      extra: !!this._ad ? this._ad.extra : {},
    };

    this._isDirty = !deepEqual(this._initState, newState);
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

  getContent(lang: ILanguage): IAdContentsItem {
    return this._ad.contents[lang.code];
  }

  updateStateFor(state: IAdContents, lang: ILanguage): void {
    const mergedState: IAdContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: IAdContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

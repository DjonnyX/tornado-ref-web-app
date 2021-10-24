import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { IOrderType, IAsset, ICurrency, IOrderTypeContents, IOrderTypeContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepEqual, deepMergeObjects } from '@app/utils/object.util';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';

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

      this.resetInitState();
      this.checkDirty();
    }
  }

  get orderType() {
    return this._orderType;
  }

  @Input() currencies: Array<ICurrency>;

  @Input() isEditMode: boolean;

  isEdit: boolean = false;

  @Output() save = new EventEmitter<IOrderType>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IOrderType>();

  @Output() uploadMainResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadThumbnailResource = new EventEmitter<IFileUploadEvent>();

  @Output() uploadIconResource = new EventEmitter<IFileUploadEvent>();

  private _state: IOrderTypeContents = {};

  private _initState: any;

  private _isDirty = false;
  get isDirty() { return this._isDirty; }

  constructor(private _fb: FormBuilder, public dialog: MatDialog) {
    super();

    this.form = this._fb.group({});
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
      ...this._orderType,
      ...this.form.value,
      contents: { ...(!!this._orderType ? this._orderType.contents : undefined), ...this._state },
      active: !!this._orderType && this._orderType.active !== undefined ? this._orderType.active : true,
      extra: !!this._orderType ? this._orderType.extra : {},
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
        ...this._orderType,
        ...this.form.value,
        contents: { ...(!!this._orderType ? this._orderType.contents : undefined), ...this._state },
        active: !!this._orderType && this._orderType.active !== undefined ? this._orderType.active : true,
        extra: !!this._orderType ? this._orderType.extra : {},
      });

      this.isEdit = false;
      this.resetInitState();
      this.checkDirty();
    }
  }

  checkDirty() {
    const newState = {
      ...this._orderType,
      ...this.form.value,
      contents: { ...(!!this._orderType ? this._orderType.contents : undefined), ...this._state },
      active: !!this._orderType && this._orderType.active !== undefined ? this._orderType.active : true,
      extra: !!this._orderType ? this._orderType.extra : {},
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

  getContent(lang: ILanguage): IOrderTypeContentsItem {
    return this._orderType.contents[lang.code];
  }

  updateStateFor(state: IOrderTypeContents, lang: ILanguage): void {
    const mergedState: IOrderTypeContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: IOrderTypeContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

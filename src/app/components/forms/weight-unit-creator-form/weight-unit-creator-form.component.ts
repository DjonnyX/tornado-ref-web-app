import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import * as _ from "lodash";
import { BaseComponent } from '@components/base/base-component';
import { IWeightUnit, IAsset, IWeightUnitContents, IWeightUnitContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';
import { IFileUploadEntityEvent } from '@app/models/file-upload-event.model';
import { deepEqual, deepMergeObjects } from '@app/utils/object.util';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-weight-unit-creator-form',
  templateUrl: './weight-unit-creator-form.component.html',
  styleUrls: ['./weight-unit-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightUnitCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

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

  private _weightUnit: IWeightUnit;
  @Input() set weightUnit(weightUnit: IWeightUnit) {
    if (weightUnit) {
      this._weightUnit = weightUnit;

      this._state = { ...this._state, ...(this._weightUnit ? this._weightUnit.contents : undefined) };

      this.resetInitState();
      this.checkDirty();
    }
  }

  get weightUnit() {
    return this._weightUnit;
  }

  @Input() isEditMode: boolean;

  isEdit: boolean = false;

  @Output() save = new EventEmitter<IWeightUnit>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IWeightUnit>();

  private _state: IWeightUnitContents = {};

  private _initState: any;

  private _isDirty = false;
  get isDirty() { return this._isDirty; }

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
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
          title: "common_dialog-save-changes",
          message: "common_dialog-want-to-keep-unsaved-changes",
          buttons: {
            confirm: {
              label: "common_action-yes",
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
      ...this._weightUnit,
      ...this.form.value,
      contents: { ...(!!this._weightUnit ? this._weightUnit.contents : undefined), ...this._state },
      systemName: !!this._weightUnit && this._weightUnit.systemName !== undefined ? this._weightUnit.systemName : "custom",
      extra: !!this._weightUnit ? this._weightUnit.extra : {},
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
        ...this._weightUnit,
        ...this.form.value,
        contents: { ...(!!this._weightUnit ? this._weightUnit.contents : undefined), ...this._state },
        systemName: !!this._weightUnit && this._weightUnit.systemName !== undefined ? this._weightUnit.systemName : "custom",
        extra: !!this._weightUnit ? this._weightUnit.extra : {},
      });

      this.isEdit = false;
      this.resetInitState();
      this.checkDirty();
    }
  }

  checkDirty() {
    const newState = {
      ...this._weightUnit,
      ...this.form.value,
      contents: { ...(!!this._weightUnit ? this._weightUnit.contents : undefined), ...this._state },
      systemName: !!this._weightUnit && this._weightUnit.systemName !== undefined ? this._weightUnit.systemName : "custom",
      extra: !!this._weightUnit ? this._weightUnit.extra : {},
    };

    this._isDirty = !deepEqual(this._initState, newState);
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

  getContent(lang: ILanguage): IWeightUnitContentsItem {
    return this._weightUnit.contents[lang.code];
  }

  updateStateFor(state: IWeightUnitContents, lang: ILanguage): void {
    const mergedState: IWeightUnitContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: IWeightUnitContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

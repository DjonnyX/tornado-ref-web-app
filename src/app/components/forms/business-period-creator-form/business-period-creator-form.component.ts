import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { IBusinessPeriod, ILanguage, IBusinessPeriodContents, IBusinessPeriodContentsItem } from '@djonnyx/tornado-types';
import { ScheduleComponent } from '@components/schedule/schedule.component';
import { deepMergeObjects } from '@app/utils/object.util';

@Component({
  selector: 'ta-business-period-creator-form',
  templateUrl: './business-period-creator-form.component.html',
  styleUrls: ['./business-period-creator-form.component.scss']
})
export class BusinessPeriodCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild("schedule", { static: false }) private _schedule: ScheduleComponent;

  form: FormGroup;

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

  private _businessPeriod: IBusinessPeriod;
  @Input() set businessPeriod(businessPeriod: IBusinessPeriod) {
    if (businessPeriod) {
      this._businessPeriod = businessPeriod;

      this._schedule.setValue(businessPeriod.schedule);
    }
  }

  get businessPeriod() {
    return this._businessPeriod;
  }

  @Input() isEditMode: boolean;

  isEdit: boolean = false;

  @Output() save = new EventEmitter<IBusinessPeriod>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IBusinessPeriod>();

  private _state: IBusinessPeriodContents = {};

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
        ...this._businessPeriod,
        ...this.form.value, schedule: this._schedule.value || [],
        contents: { ...(!!this._businessPeriod ? this._businessPeriod.contents : undefined), ...this._state },
        active: !!this._businessPeriod && this._businessPeriod.active !== undefined ? this._businessPeriod.active : true,
        extra: !!this._businessPeriod ? this._businessPeriod.extra : {},
      });

      this.isEdit = false;
    }
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

  getContent(lang: ILanguage): IBusinessPeriodContentsItem {
    return this._businessPeriod.contents[lang.code];
  }

  updateStateFor(state: IBusinessPeriodContents, lang: ILanguage): void {
    const mergedState: IBusinessPeriodContents = { [lang.code]: deepMergeObjects(this._state[lang.code], state, true) };
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

  private updateState(state: IBusinessPeriodContents): void {
    this._state = deepMergeObjects(this._state, state, true);
  }
}

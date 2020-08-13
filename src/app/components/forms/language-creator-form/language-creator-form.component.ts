import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { ILanguage, ILanguageImages, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-language-creator-form',
  templateUrl: './language-creator-form.component.html',
  styleUrls: ['./language-creator-form.component.scss']
})
export class LanguageCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  ctrlName = new FormControl('', [Validators.required]);

  @Input() images: ILanguageImages;

  @Input() assets: Array<IAsset>;

  private _language: ILanguage;
  @Input() set language(language: ILanguage) {
    if (language) {
      this._language = language;

      this.ctrlName.setValue(language.name);
    }
  }

  @Input() isEditMode: boolean;

  @Output() save = new EventEmitter<ILanguage>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<ILanguage>();

  constructor(private _fb: FormBuilder) {
    super();

    this.form = this._fb.group({
      name: this.ctrlName,
    })
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this.update.emit(value);
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onSave(): void {
    if (this.form.valid) {
      const images: ILanguageImages = {...this.images};
      if (!(images as any).hasOwnProperty("main")) {
        images.main = null;
      }

      this.save.emit({
        ...this._language,
        ...this.form.value,
        images,
        active: !!this._language && this._language.active !== undefined ? this._language.active : true,
        extra: !!this._language ? this._language.extra : {},
      });
    }
  }

  onMainImageSelect(asset: IAsset): void {
    this.images = {...this.images, main: !!asset ? asset.id : null};
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

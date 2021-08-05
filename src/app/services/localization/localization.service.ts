import { Injectable } from '@angular/core';
import { LocalizationConfig } from './localization.config';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  lang: string = "ru";

  constructor(private _config: LocalizationConfig) { }

  changeLanguage(langCode: string) {
    this.lang = langCode;
  }

  get(key: string): string {
    return this._config?.[this.lang]?.[key];
  }
}

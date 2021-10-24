import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalizationConfig } from './localization.config';

const PATTERN_SEGMENTS = /(#\{.*?\})|([\w-]+)/g;
const PATTERN_ARGS = /(#\{.*?\})/;
const PATTERN_KEY = /([\w-]+)/;

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  lang: string = "eng";

  private _change$ = new BehaviorSubject<string>(this.lang);
  change$ = this._change$.asObservable();

  constructor(private _config: LocalizationConfig) { }

  changeLanguage(langCode: string) {
    this.lang = langCode;
    this._change$.next(this.lang);
  }

  get(key: string): string {
    const segments = key.match(PATTERN_SEGMENTS);

    let result = "";
    segments?.forEach(segment => {
      if (segment.match(PATTERN_ARGS)?.length > 0) {
        let simpleText = segment.match(PATTERN_ARGS)[0];
        simpleText = simpleText.replace(/(#\{)/g, "");
        simpleText = simpleText.replace(/(\})/g, "");
        result += simpleText;
      } else if (segment.match(PATTERN_KEY)?.length > 0) {
        const translateKey = segment.match(PATTERN_KEY)[0];
        result += this._config?.[this.lang]?.[translateKey] || "";
      } else {
        result += segment;
      }
    });
    return result;
  }
}

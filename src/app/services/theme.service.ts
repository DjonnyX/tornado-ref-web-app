import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ThemeNames {
  LIGHT = "light",
  DARK = "dark",
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _themes = new Array<ThemeNames | string>();
  public get themes() {return this._themes;}

  @Input() theme: ThemeNames | string = ThemeNames.LIGHT;

  private _theme$ = new BehaviorSubject<ThemeNames | string>(this.theme);
  public readonly theme$ = this._theme$.asObservable();

  constructor() {
    this.registerTheme(ThemeNames.LIGHT);
    this.registerTheme(ThemeNames.DARK);
  }

  registerTheme(theme: ThemeNames | string): void {
    this._themes.push(theme);
  }

  toggle(): void {
    const currentIndex = this._themes.indexOf(this.theme);

    if (currentIndex === -1) {
      return;
    }

    if (currentIndex < this._themes.length - 1) {
      this.theme = this._themes[currentIndex + 1];
    } else {
      this.theme = this._themes[0];
    }

    this._theme$.next(this.theme);
  }
}

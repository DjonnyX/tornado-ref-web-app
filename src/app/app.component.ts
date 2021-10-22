import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { CapabilitiesSelectors, SettingsSelectors, UserSelectors } from '@store/selectors';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { CapabilitiesActions } from '@store/actions/capabilities.action';
import { extractURL } from './utils/url-extractor.util';
import { UserActions } from '@store/actions/user.action';
import { LocalizationService } from './services/localization/localization.service';
import { DefaultRoleTypes } from '@djonnyx/tornado-types';
import { environment } from '@environments';

const ROOT_LINKS = [
  "signin",
  "signin",
  "signup",
  "forgot-password",
  "forgot-password-result",
  "reset-password",
  "reset-password-result",
  "change-email",
  "change-email-result",
  "reset-email",
  "reset-email-result",
  "term-of-use",
  "auth-error",
  "cookie-term-of-use",
  "page-not-found",
  "documentation",
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public readonly isShowCoockieConcent = ["all", "cms"].indexOf(environment.buildType) > -1;

  private _url: string;

  private _startUrl: string;

  private _previouseTheme: string;

  private _rootLinks = Array<string>();

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _localization: LocalizationService,
  ) {
    ROOT_LINKS.forEach(link => {
      this._rootLinks.push(link);
      this._rootLinks.push(`/${link}`);
      this._rootLinks.push(`/${link}/`);
    });

    this._startUrl = `${window.location.pathname}/${window.location.search}`;

    this._store.pipe(
      select(SettingsSelectors.selectTheme),
    ).subscribe(
      v => {
        const body = document.body;
        const themeClass = `theme-${v}`;
        body.classList.add(themeClass);
        body.classList.remove(this._previouseTheme);
        this._previouseTheme = themeClass;
      }
    );

    this._store.pipe(
      select(SettingsSelectors.selectLanguage),
    ).subscribe(
      v => {
        this._localization.changeLanguage(v);
      }
    );

    this._store.dispatch(UserActions.resetLoading());

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this._url = event.url;
      if (this.isReturnedRoute(this._url)) {
        this._store.dispatch(CapabilitiesActions.setReturnUrl({ returnUrl: event.url }));
      }
    });

    this._store.pipe(
      select(UserSelectors.selectUserProfile),
    ).pipe(
      switchMap((profile) => {
        return this._store.pipe(
          take(1),
          select(CapabilitiesSelectors.selectReturnUrl),
          tap(returnUrl => {
            const startUrl = this._startUrl;
            this._startUrl = null;

            if (!startUrl) {
              // signin
              if (!!profile?.token) {
                const url = extractURL(decodeURIComponent(returnUrl));

                if (!!returnUrl) {
                  this._router.navigate([url.path], {
                    queryParams: url.query,
                  });
                } else if (returnUrl === undefined || returnUrl === "") {
                  if (profile.account.role.name !== DefaultRoleTypes.ADMIN) {
                    this._router.navigate(["/admin/profile"]);
                  } else {
                    this._router.navigate(["/admin/licenses"]);
                  }
                }
              }
              // signout
              else if (!!this.extractUrlPath(this._url) || this.isReturnedRoute(this._url)) {
                if (["all", "cms"].indexOf(environment.buildType) > -1) {
                  this._router.navigate(["signin"]);
                } else {
                  this._router.navigate(["documentation"]);
                }
              }
            }
          }),
        );
      })
    ).subscribe();
  }

  ngOnInit(): void { }

  private extractUrlPath(url: string): string {
    const urlPath = url?.match(/^.*(?=\?)|(.*)/);
    return !!urlPath && urlPath.length > 0 ? urlPath[0] : undefined;
  }

  private isReturnedRoute(url: string): boolean {
    const urlPath = this.extractUrlPath(url);

    if (!urlPath) {
      return false;
    }

    return this._rootLinks.indexOf(urlPath) === -1;
  }
}

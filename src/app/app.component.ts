import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { CapabilitiesSelectors, UserSelectors } from '@store/selectors';
import { combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { CapabilitiesActions } from '@store/actions/capabilities.action';
import { extractURL } from './utils/url-extractor.util';
import { RoleTypes } from '@enums/role-types';
import { UserActions } from '@store/actions/user.action';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _url: string;

  themeClass: any;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public readonly themeService: ThemeService,
  ) {

    this.themeService.theme$.subscribe(
      v => {
        this.themeClass = { [`theme-${v}`]: true };
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

    combineLatest([
      this._store.pipe(
        select(UserSelectors.selectUserProfile),
      ),
    ]).subscribe(([profile]) => {
      this._store.pipe(
        take(1),
        select(CapabilitiesSelectors.selectReturnUrl),
      ).subscribe(returnUrl => {

        // signin
        if (!!profile?.token) {
          const url = extractURL(decodeURIComponent(returnUrl));

          if (!!returnUrl) {
            this._router.navigate([url.path], {
              queryParams: url.query,
            });
          } else if (returnUrl === undefined || returnUrl === "") {
            if (profile.role === RoleTypes.CLIENT) {
              this._router.navigate(["/admin/licenses-account"]);
            } else if (profile.role === RoleTypes.ADMIN) {
              this._router.navigate(["/admin/licenses"]);
            }
          }
        }
        // signout
        else if (!!this.extractUrlPath(this._url) || this.isReturnedRoute(this._url)) {
          this._router.navigate(["signin"]);
        }
      });
    });
  }

  ngOnInit(): void { }

  private extractUrlPath(url: string): string {
    const urlPath = url?.match(/^.*(?=\?)|(.*)/);
    return !!urlPath && urlPath.length > 0 ? urlPath[0] : undefined;
  }

  private isReturnedRoute(url: string): boolean {
    const urlPath = this.extractUrlPath(url);

    switch (urlPath) {
      case undefined:
      case "/signin":
      case "/signup":
      case "/forgot-password":
      case "/forgot-password-result":
      case "/reset-password":
      case "/reset-password-result":
      case "/term-of-use":
      case "/auth-error":
      case "/cookie-term-of-use":
      case "/page-not-found":
        return false;
      default:
        return true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { CapabilitiesSelectors, UserSelectors } from '@store/selectors';
import { combineLatest } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CapabilitiesActions } from '@store/actions/capabilities.action';
import { extractURL } from './utils/url-extractor.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {

    this._router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      switch (event.url) {
        case "/signin":
        case "/signup":
        case "/forgot-password":
        case "/forgot-password-result":
        case "/reset-password":
        case "/reset-password-result":
        case "/term-of-use":
        case "/auth-error":
          break;
        default:
          this._store.dispatch(CapabilitiesActions.setReturnUrl({ returnUrl: event.url }));
      }
    });

    combineLatest(
      this._store.pipe(
        select(UserSelectors.selectToken),
      ),
    ).subscribe(([token]) => {
      this._store.pipe(
        take(1),
        select(CapabilitiesSelectors.selectReturnUrl),
      ).subscribe(returnUrl => {
        const url = extractURL(decodeURIComponent(returnUrl));

        // signin
        if (!!token) {
          if (!!returnUrl) {
            this._router.navigate([url.path], {
              queryParams: url.query,
            });
          } else {
            this._router.navigate(["/admin/menu-tree"]);
          }
        }
        // signout
        else {
          this._router.navigate(["signin"]);
        }
      });
    });
  }

  ngOnInit(): void { }
}

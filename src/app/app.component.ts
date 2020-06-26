import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { CapabilitiesSelectors, UserSelectors } from '@store/selectors';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _store: Store<IAppState>, private _router: Router) {
    combineLatest(
      this._store.pipe(
        select(UserSelectors.selectUserProfile),
        map(profile => !!profile ? profile.token : undefined)
      ),
      this._store.pipe(
        select(CapabilitiesSelectors.selectReturnUrl)
      ),
    ).subscribe(([token, returnUrl]) => {
      // signin
      if (!!token) {
        if (!!returnUrl) {
          this._router.navigate([returnUrl]);
        } else {
          this._router.navigate(["admin"]);
        }
      }
      // signout
      else {
        this._router.navigate(["signin"]);
      }
    });
  }
}

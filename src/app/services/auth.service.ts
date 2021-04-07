import { Injectable } from '@angular/core';
import { UserRights } from '@djonnyx/tornado-types';
import { IUserProfile } from '@models';
import { select, Store } from '@ngrx/store';
import { UserSelectors } from '@store/selectors';
import { IAppState } from '@store/state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _profile$: Observable<IUserProfile>;
  get profile$() { return this._profile$; }

  private _profile: IUserProfile;
  get profile() { return this._profile; }

  get isAuthenticated() {
    return !!this._profile && !!this._profile.token;
  }

  constructor(private _store: Store<IAppState>) {
    this._profile$ = this._store.pipe(
      select(UserSelectors.selectUserProfile),
    );

    this._profile$.subscribe(profile => {
      this._profile = profile;
    })
  }

  hasRight(right: UserRights) {
    if (right === undefined || !this._profile?.account?.rights || this._profile.account.rights.length === 0) {
      return true;
    }

    return this._profile.account.rights.indexOf(right) > -1;
  }

  hasAuthority(roles: Array<string>): boolean {
    if (roles === undefined || !this._profile?.role || !roles || roles.length === 0) {
      return true;
    }

    return roles.indexOf(this._profile.role) > -1;
  }
}

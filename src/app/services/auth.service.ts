import { Injectable } from '@angular/core';
import { DefaultRoleTypes, UserRights } from '@djonnyx/tornado-types';
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
    if (right === undefined || !this._profile?.account?.role?.rights || this._profile.account.role.rights.length === 0) {
      return true;
    }

    return this._profile.account.role.rights.indexOf(right) > -1;
  }

  hasAnyRights(rights: Array<UserRights>): boolean {
    if (rights === undefined || rights.length === 0 || !this._profile?.account?.role?.rights || this._profile.account.role.rights.length === 0) {
      return true;
    }

    return rights.filter(r => this._profile.account.role.rights.indexOf(r) > -1).length > 0;
  }

  hasAuthority(roles: Array<string>): boolean {
    if (roles === undefined || !this._profile?.account.role || !roles || roles.length === 0) {
      return true;
    }

    return roles.indexOf(this._profile.account.role.name) > -1
      || (this._profile.account.role.name !== DefaultRoleTypes.ADMIN && roles.indexOf("any") > -1);
  }
}

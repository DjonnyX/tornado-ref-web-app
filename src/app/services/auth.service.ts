import { Injectable } from '@angular/core';
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

  hasAuthority(roles: Array<string>): boolean {
    if (!this._profile?.role || !roles || roles.length === 0) {
      return true;
    }

    return roles.indexOf(this._profile.role) > -1;
  }
}

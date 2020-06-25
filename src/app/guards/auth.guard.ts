import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from "@ngrx/store";
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _store: Store<IAppState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(v => v),
      mergeMap(profile => {
        const isTokenExists = !!profile && !!profile.token;
        if (!isTokenExists) {
          this._router.navigate(["signin"]);
        }
        return of(isTokenExists);
      }),
    );
  }
}

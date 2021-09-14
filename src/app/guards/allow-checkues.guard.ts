import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { UserRights } from '@djonnyx/tornado-types';
import { Store } from '@ngrx/store';
import { CapabilitiesActions } from '@store/actions/capabilities.action';
import { IAppState } from '@store/state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllowCheckuesGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router, private _store: Store<IAppState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowCheckues = this._authService.hasRight(UserRights.READ_CHECKUES);

    if (!allowCheckues) {
      this._store.dispatch(CapabilitiesActions.setReturnUrl({ returnUrl: "" }));
      this._router.navigate([""]);
    }
    return allowCheckues;
  }

}

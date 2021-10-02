import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { INavRoute } from '@components/navigation-menu/interfaces';
import { Observable } from 'rxjs';
import { MENU_ROUTES } from '../admin.container';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.hasAccess(route.url.join("/"))) {
      return true;
    }

    this._router.navigate(["admin/page-not-found"]);
    return false;
  }

  private hasAccess(route: string, routes: Array<INavRoute> = MENU_ROUTES): boolean {
    for (const navRoute of routes) {
      let exists: boolean = false;
      if (navRoute?.children?.length > 0) {
        exists = this.hasAccess(route, navRoute.children);
      } else {
        exists = route.indexOf(navRoute.route) > -1 && this._authService.hasRight(navRoute.right);
      }
      if (!!exists) {
        return true;
      }
    }

    return false;
  }
}

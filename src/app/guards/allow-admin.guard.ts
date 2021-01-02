import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { RoleTypes } from '@enums/role-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllowAdminGuard implements CanActivate {
  constructor(private _authService: AuthService) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.hasAuthority([RoleTypes.ADMIN]);
  }
  
}

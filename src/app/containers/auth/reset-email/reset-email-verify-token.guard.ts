import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from '@services';

@Injectable()
export class ResetEmailVerifyTokenGuard implements CanActivate {
    constructor(private _apiService: ApiService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const restoreEmailCode = route.queryParams["restoreEmailCode"];

        if (!restoreEmailCode) {
            this.gotoInvalidPage("Token is not valid.");
            return of(false);
        }

        return this._apiService.verifyResetEmailToken(restoreEmailCode).pipe(
            take(1),
            switchMap(v => {
                return of(!!v);
            }),
            catchError((error: Error) => {
                this.gotoInvalidPage(error.message);
                return of(error.message as any);
            }),
        );
    }

    private gotoInvalidPage(error: string) {
        this._router.navigate(["auth-error"], {
            queryParams: { error }
        });
    }
}

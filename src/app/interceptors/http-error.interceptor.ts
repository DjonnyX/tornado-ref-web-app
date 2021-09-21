import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IBaseResponse, IErrorResponse } from '@services';
import { IAppState } from '@store/state';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { Injectable } from '@angular/core';

const extractError = (error: IErrorResponse): string => {
    if (error.length === 0) return;

    let errorMessage = "";
    for (let i = 0, l = error.length; i < l; i++) {
        errorMessage += `${error[i].message}\n`; //`Error Code: ${err.code}. Message: ${err.message}\n`;
    };
    return errorMessage;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private _store: Store<IAppState>) { }

    intercept(
        request: HttpRequest<IBaseResponse<{}, {}>>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(() => {
                const error = request.body?.error;
                if (!!error && error instanceof Array) {
                    return throwError(extractError(error)) as any;
                } else if (!!error) {
                    return throwError(`${error}\n`) as any;
                }
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "";

                if (error.status === 401) {
                    let err: string;
                    if (!!error.error && error.error.error instanceof Array) {
                        err = extractError(error.error.error);
                    }
                    this._store.dispatch(UserActions.clearProfile());
                    errorMessage = err;
                } else
                if (!!error.error && error.error.error instanceof Array) {
                    errorMessage = extractError(error.error.error);
                } else {
                    errorMessage = `${error.message}\n`; //`Error Code: ${error.status}\nMessage: ${error.message}`;
                }

                if (!errorMessage || errorMessage === "jwt expired" || errorMessage === "Token is empty.") {
                    errorMessage = "Время сессии истекло.";
                } else if (errorMessage === "Token is empty.") {
                    errorMessage = "Вы не авторизованы.";
                } else if (errorMessage === "License method not allowed") {
                    errorMessage = "Метод не доступен.";
                }

                throw Error(errorMessage);
            })
        );
    }
}
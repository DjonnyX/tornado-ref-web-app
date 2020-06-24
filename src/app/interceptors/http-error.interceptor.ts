import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { IBaseResponse, IErrorResponse } from '@services';

const extractError = (error: IErrorResponse): string => {
    if (error.length === 0) return;

    let errorMessage = "";
    for (let i = 0, l = error.length; i < l; i++) {
        errorMessage += `${error[i].message}\n`; //`Error Code: ${err.code}. Message: ${err.message}\n`;
    };
    return errorMessage;
}

export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(
        request: HttpRequest<IBaseResponse<{}, {}>>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "";
                if (!!error.error && error.error.error instanceof Array) {
                    errorMessage = extractError(error.error.error);
                } else {
                    errorMessage = `${error.message}\n`; //`Error Code: ${error.status}\nMessage: ${error.message}`;
                }

                throw Error(errorMessage);
            })
        );
    }
}
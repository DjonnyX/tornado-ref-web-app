import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUserProfile } from '@models';
import {
  IUserSigninRequest, IUserSigninResponse, IUserSignupRequest, IUserSignupResponse,
  IUserResetPasswordRequest, IUserResetPasswordResponse, IUserForgotPasswordRequest,
  IUserForgotPasswordResponse,
  IProductsGetResponse,
  IProductsCreateResponse,
  IProductsUpdateResponse,
  IProductsDeleteResponse
} from './interfaces';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import { IProduct } from '@app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _token: string;

  constructor(private _http: HttpClient, private _store: Store<IAppState>) {
    this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(profile => !!profile ? profile.token : undefined),
    ).subscribe(token => {
      this._token = token;
    })
  }

  public signin(params: IUserSigninRequest): Observable<IUserProfile> {
    return this._http
      .post<IUserSigninResponse>("api/v1/auth/signin", params)
      .pipe(
        map(res => res.data),
      );
  }

  public signup(params: IUserSignupRequest): Observable<{}> {
    return this._http
      .post<IUserSignupResponse>("api/v1/auth/signup", params)
      .pipe(
        map(res => res.data),
      );
  }

  public forgotPassword(params: IUserForgotPasswordRequest): Observable<{}> {
    return this._http
      .post<IUserForgotPasswordResponse>("api/v1/auth/forgot-password", params)
      .pipe(
        map(res => res.data),
      );
  }

  public verifyResetPasswordToken(token: string): Observable<{}> {
    return this._http
      .post<IUserResetPasswordResponse>("api/v1/auth/verify-reset-password-token", { token })
      .pipe(
        map(res => res.data),
      );
  }

  public resetPassword(params: IUserResetPasswordRequest): Observable<{}> {
    return this._http
      .post<IUserResetPasswordResponse>("api/v1/auth/reset-password", params)
      .pipe(
        map(res => res.data),
      );
  }

  // protected

  public signout(): Observable<{}> {
    return this._http
      .post<any>("api/v1/auth/signout", {}, {
        headers: {
          authorization: this._token,
        },
      })
      .pipe(
        map(res => res.data),
      );
  }

  public getNodes(): Observable<{}> {
    return this._http
      .get<any>("api/v1/nodes", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getProducts(): Observable<IProductsGetResponse> {
    return this._http
      .get<IProductsGetResponse>("api/v1/products", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createProduct(product: IProduct): Observable<IProductsCreateResponse> {
    console.log(product)
    return this._http
      .post<IProductsCreateResponse>("api/v1/products", product, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateProduct(id: string, product: IProduct): Observable<IProductsUpdateResponse> {
    return this._http
      .put<IProductsUpdateResponse>(`api/v1/products/${id}`, product, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteProduct(id: string): Observable<IProductsDeleteResponse> {
    return this._http
      .delete<IProductsDeleteResponse>(`api/v1/products/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }
}

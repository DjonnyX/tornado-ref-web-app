import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUserProfile, ITag, ISelector } from '@models';
import {
  IUserSigninRequest, IUserSigninResponse, IUserSignupRequest, IUserSignupResponse,
  IUserResetPasswordRequest, IUserResetPasswordResponse, IUserForgotPasswordRequest,
  IUserForgotPasswordResponse,
  IProductsGetResponse,
  IProductsCreateResponse,
  IProductsUpdateResponse,
  IProductsDeleteResponse,
  ITagsGetResponse,
  ITagsCreateResponse,
  ITagsUpdateResponse,
  ITagsDeleteResponse,
  ISelectorsGetResponse,
  ISelectorsCreateResponse,
  ISelectorsUpdateResponse,
  ISelectorsDeleteResponse
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
      select(UserSelectors.selectToken),
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

  // products
  public getProducts(): Observable<IProductsGetResponse> {
    return this._http
      .get<IProductsGetResponse>("api/v1/products", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createProduct(product: IProduct): Observable<IProductsCreateResponse> {
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

  // selectors
  public getSelectors(): Observable<ISelectorsGetResponse> {
    return this._http
      .get<ISelectorsGetResponse>("api/v1/selectors", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createSelector(selector: ISelector): Observable<ISelectorsCreateResponse> {
    return this._http
      .post<ISelectorsCreateResponse>("api/v1/selectors", selector, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateSelector(id: string, selector: ISelector): Observable<ISelectorsUpdateResponse> {
    return this._http
      .put<ISelectorsUpdateResponse>(`api/v1/selectors/${id}`, selector, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteSelector(id: string): Observable<ISelectorsDeleteResponse> {
    return this._http
      .delete<ISelectorsDeleteResponse>(`api/v1/selectors/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }
  
  // tags
  public getTags(): Observable<ITagsGetResponse> {
    return this._http
      .get<ITagsGetResponse>("api/v1/tags", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createTag(tag: ITag): Observable<ITagsCreateResponse> {
    return this._http
      .post<ITagsCreateResponse>("api/v1/tags", tag, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateTag(id: string, tag: ITag): Observable<ITagsUpdateResponse> {
    return this._http
      .put<ITagsUpdateResponse>(`api/v1/tags/${id}`, tag, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteTag(id: string): Observable<ITagsDeleteResponse> {
    return this._http
      .delete<ITagsDeleteResponse>(`api/v1/tags/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUserProfile, IAsset } from '@models';
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
  ISelectorsDeleteResponse,
  IMenuNodesGetResponse,
  IMenuNodesCreateResponse,
  IMenuNodesUpdateResponse,
  IMenuNodesDeleteResponse,
  IAssetsDeleteResponse,
  IAssetsUpdateResponse,
  IAssetsCreateResponse,
  IAssetsGetResponse,
  IProductsAssetCreateResponse,
  IProductsAssetDeleteResponse,
  IProductsAssetGetResponse,
  IProductGetResponse,
  ITagGetResponse,
  ISelectorGetResponse,
  IBusinessPeriodsGetResponse,
  IBusinessPeriodGetResponse,
  IBusinessPeriodCreateResponse,
  IBusinessPeriodUpdateResponse,
  IBusinessPeriodDeleteResponse
} from './interfaces';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import { IProduct, ISelector, INode, ITag } from '@djonnyx/tornado-types';

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

  // products
  public getProducts(): Observable<IProductsGetResponse> {
    return this._http
      .get<IProductsGetResponse>("api/v1/products", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getProduct(id: string): Observable<IProductGetResponse> {
    return this._http
      .get<IProductGetResponse>(`api/v1/product/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createProduct(product: IProduct): Observable<IProductsCreateResponse> {
    return this._http
      .post<IProductsCreateResponse>("api/v1/product", product, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateProduct(id: string, product: IProduct): Observable<IProductsUpdateResponse> {
    return this._http
      .put<IProductsUpdateResponse>(`api/v1/product/${id}`, product, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteProduct(id: string): Observable<IProductsDeleteResponse> {
    return this._http
      .delete<IProductsDeleteResponse>(`api/v1/product/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getProductAssets(productId: string): Observable<IProductsAssetGetResponse> {
    return this._http
      .get<IProductsAssetGetResponse>(`api/v1/product/${productId}/assets`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createProductAsset(productId: string, file: File): Observable<IProductsAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this._http
      .post<IProductsAssetCreateResponse>(`api/v1/product/${productId}/asset`, formData, {
        headers: {
          authorization: this._token,
        },
        reportProgress: true,
        observe: "events",
      }).pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * event.loaded / event.total);
              return {
                data: {
                  progress: {
                    total: event.total,
                    loaded: event.loaded,
                    progress,
                  },
                }
              }
            case HttpEventType.Response:
              return event.body;
          }
        }),
      );
  }

  public deleteProductAsset(productId: string, assetId: string): Observable<IProductsAssetDeleteResponse> {
    return this._http
      .delete<IProductsAssetDeleteResponse>(`api/v1/product/${productId}/asset/${assetId}`, {
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

  public getSelector(id: string): Observable<ISelectorGetResponse> {
    return this._http
      .get<ISelectorGetResponse>(`api/v1/selector/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createSelector(selector: ISelector): Observable<ISelectorsCreateResponse> {
    return this._http
      .post<ISelectorsCreateResponse>("api/v1/selector", selector, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateSelector(id: string, selector: ISelector): Observable<ISelectorsUpdateResponse> {
    return this._http
      .put<ISelectorsUpdateResponse>(`api/v1/selector/${id}`, selector, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteSelector(id: string): Observable<ISelectorsDeleteResponse> {
    return this._http
      .delete<ISelectorsDeleteResponse>(`api/v1/selector/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  // businessPeriods
  public getBusinessPeriods(): Observable<IBusinessPeriodsGetResponse> {
    return this._http
      .get<IBusinessPeriodsGetResponse>("api/v1/business-periods", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getBusinessPeriod(id: string): Observable<IBusinessPeriodGetResponse> {
    return this._http
      .get<IBusinessPeriodGetResponse>(`api/v1/business-periods/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createBusinessPeriod(selector: ISelector): Observable<IBusinessPeriodCreateResponse> {
    return this._http
      .post<IBusinessPeriodCreateResponse>("api/v1/business-periods", selector, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateBusinessPeriod(id: string, selector: ISelector): Observable<IBusinessPeriodUpdateResponse> {
    return this._http
      .put<IBusinessPeriodUpdateResponse>(`api/v1/business-periods/${id}`, selector, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteBusinessPeriod(id: string): Observable<IBusinessPeriodDeleteResponse> {
    return this._http
      .delete<IBusinessPeriodDeleteResponse>(`api/v1/business-periods/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  // assets
  public getAssets(): Observable<IAssetsGetResponse> {
    return this._http
      .get<IAssetsGetResponse>("api/v1/assets", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createAsset(asset: IAsset): Observable<any> { //IAssetsCreateResponse
    return this._http
      .post<any>("api/v1/asset", asset, {
        headers: {
          authorization: this._token,
        },
        reportProgress: true,
        observe: "events",
      }).pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * event.loaded / event.total);
              return {
                progress: {
                  total: event.total,
                  loaded: event.loaded,
                  progress,
                },
              }
            case HttpEventType.Response:
              return {
                asset: event,
              }
          }
        }),
      )
  }

  public updateAsset(id: string, asset: IAsset): Observable<IAssetsUpdateResponse> {
    return this._http
      .put<IAssetsUpdateResponse>(`api/v1/asset/${id}`, asset, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteAsset(id: string): Observable<IAssetsDeleteResponse> {
    return this._http
      .delete<IAssetsDeleteResponse>(`api/v1/asset/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  // root-nodes
  public getRootNodes(): Observable<IMenuNodesGetResponse> {
    return this._http
      .get<IMenuNodesGetResponse>("api/v1/root-nodes", {
        headers: {
          authorization: this._token,
        },
      });
  }

  // menu-nodes
  public getNodes(id: string): Observable<IMenuNodesGetResponse> {
    return this._http
      .get<IMenuNodesGetResponse>(!!id ? `api/v1/nodes/${id}` : "api/v1/nodes", {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createNode(node: INode): Observable<IMenuNodesCreateResponse> {
    return this._http
      .post<IMenuNodesCreateResponse>("api/v1/node", node, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateNode(id: string, node: INode): Observable<IMenuNodesUpdateResponse> {
    return this._http
      .put<IMenuNodesUpdateResponse>(`api/v1/node/${id}`, node, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteNode(id: string): Observable<IMenuNodesDeleteResponse> {
    return this._http
      .delete<IMenuNodesDeleteResponse>(`api/v1/node/${id}`, {
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
  
  public getTag(id: string): Observable<ITagGetResponse> {
    return this._http
      .get<ITagGetResponse>(`api/v1/tag/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createTag(tag: ITag): Observable<ITagsCreateResponse> {
    return this._http
      .post<ITagsCreateResponse>("api/v1/tag", tag, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateTag(id: string, tag: ITag): Observable<ITagsUpdateResponse> {
    return this._http
      .put<ITagsUpdateResponse>(`api/v1/tag/${id}`, tag, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteTag(id: string): Observable<ITagsDeleteResponse> {
    return this._http
      .delete<ITagsDeleteResponse>(`api/v1/tag/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUserProfile, IAsset, IFileUploadEvent } from '@models';
import {
  IUserSigninRequest, IUserSigninResponse, IUserSignupRequest, IUserSignupResponse,
  IUserResetPasswordRequest, IUserResetPasswordResponse, IUserForgotPasswordRequest,
  IUserForgotPasswordResponse,
  IProductsGetResponse,
  IProductsCreateResponse,
  IProductsUpdateResponse,
  IProductsDeleteResponse,
  ITagsGetResponse,
  ITagCreateResponse,
  ITagUpdateResponse,
  ITagDeleteResponse,
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
  IProductAssetCreateResponse,
  IProductAssetUpdateResponse,
  IProductAssetDeleteResponse,
  IProductAssetGetResponse,
  IProductGetResponse,
  ITagGetResponse,
  ISelectorGetResponse,
  IBusinessPeriodsGetResponse,
  IBusinessPeriodGetResponse,
  IBusinessPeriodCreateResponse,
  IBusinessPeriodUpdateResponse,
  IBusinessPeriodDeleteResponse,
  ISelectorAssetDeleteResponse,
  ISelectorAssetGetResponse,
  ISelectorAssetCreateResponse,
  ISelectorAssetUpdateResponse,
  ICurrenciesGetResponse,
  ICurrencyGetResponse,
  ICurrencyCreateResponse,
  ICurrencyUpdateResponse,
  ICurrencyDeleteResponse,
  IOrderTypesGetResponse,
  IOrderTypeGetResponse,
  IOrderTypeCreateResponse,
  IOrderTypeUpdateResponse,
  IOrderTypeDeleteResponse,
  IOrderTypeAssetGetResponse,
  IOrderTypeAssetCreateResponse,
  IOrderTypeAssetUpdateResponse,
  IOrderTypeAssetDeleteResponse,
  ILanguagesGetResponse,
  ILanguageGetResponse,
  ILanguageCreateResponse,
  ILanguageUpdateResponse,
  ILanguageDeleteResponse,
  ILanguageAssetGetResponse,
  ILanguageAssetCreateResponse,
  ILanguageAssetUpdateResponse,
  ILanguageAssetDeleteResponse,
  ITranslationsGetResponse,
  ITranslationGetResponse,
  ITranslationUpdateResponse,
  IProductAssetGetByLangResponse,
  ISelectorAssetGetByLangResponse,
  ITagAssetGetResponse,
  ITagAssetCreateResponse,
  ITagAssetUpdateResponse,
  ITagAssetDeleteResponse,
} from './interfaces';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import { IProduct, ISelector, INode, ITag, SelectorTypes, IBusinessPeriod, ICurrency, IOrderType, ILanguage, LanguageImageTypes, OrderTypeImageTypes, SelectorImageTypes, ProductImageTypes, ITranslation, TagImageTypes } from '@djonnyx/tornado-types';
import { IOrderTypeAssetGetByLangResponse } from './interfaces/order-type-assets-get-by-lang-response.interface';
import { ITagAssetGetByLangResponse } from './interfaces/tag-assets-get-by-lang-response.interface';

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

  public getProductAllAssets(productId: string): Observable<IProductAssetGetResponse> {
    return this._http
      .get<IProductAssetGetResponse>(`api/v1/product/${productId}/assets`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getProductAllByLangAssets(productId: string, langCode: string): Observable<IProductAssetGetByLangResponse> {
    return this._http
      .get<IProductAssetGetByLangResponse>(`api/v1/product/${productId}/assets/${langCode}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public uploadProductImage(productId: string, type: ProductImageTypes, data: IFileUploadEvent): Observable<IProductAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IProductAssetCreateResponse>(`api/v1/product/${productId}/resource/${data.langCode}/${type}`, formData, {
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

  public createProductAsset(productId: string, data: IFileUploadEvent): Observable<IProductAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IProductAssetCreateResponse>(`api/v1/product/${productId}/asset/${data.langCode}`, formData, {
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

  public updateProductAsset(productId: string, langCode: string, assetId: string, asset: {name?: string, active?: boolean}): Observable<IProductAssetUpdateResponse> {
    return this._http
      .put<IProductAssetUpdateResponse>(`api/v1/product/${productId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteProductAsset(productId: string, langCode: string, assetId: string): Observable<IProductAssetDeleteResponse> {
    return this._http
      .delete<IProductAssetDeleteResponse>(`api/v1/product/${productId}/asset/${langCode}/${assetId}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  // selectors
  public getSelectors(selectorType?: SelectorTypes): Observable<ISelectorsGetResponse> {
    const params: any = {};
    if (!!selectorType) {
      params.type = selectorType;
    }

    return this._http
      .get<ISelectorsGetResponse>("api/v1/selectors", {
        headers: {
          authorization: this._token,
        },
        params,
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

  public getSelectorAllAssets(selectorId: string): Observable<ISelectorAssetGetResponse> {
    return this._http
      .get<ISelectorAssetGetResponse>(`api/v1/selector/${selectorId}/assets`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getSelectorAllByLangAssets(selectorId: string, langCode: string): Observable<ISelectorAssetGetByLangResponse> {
    return this._http
      .get<ISelectorAssetGetByLangResponse>(`api/v1/selector/${selectorId}/assets/${langCode}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public uploadSelectorImage(selectorId: string, type: SelectorImageTypes, data: IFileUploadEvent): Observable<ISelectorAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<ISelectorAssetCreateResponse>(`api/v1/selector/${selectorId}/resource/${data.langCode}/${type}`, formData, {
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

  public createSelectorAsset(selectorId: string, data: IFileUploadEvent): Observable<ISelectorAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<ISelectorAssetCreateResponse>(`api/v1/selector/${selectorId}/asset/${data.langCode}`, formData, {
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

  public updateSelectorAsset(selectorId: string, langCode: string, assetId: string, asset: {name?: string, active?: boolean}): Observable<ISelectorAssetUpdateResponse> {
    return this._http
      .put<ISelectorAssetUpdateResponse>(`api/v1/selector/${selectorId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteSelectorAsset(selectorId: string, langCode: string, assetId: string): Observable<ISelectorAssetDeleteResponse> {
    return this._http
      .delete<ISelectorAssetDeleteResponse>(`api/v1/selector/${selectorId}/asset/${langCode}/${assetId}`, {
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
      .get<IBusinessPeriodGetResponse>(`api/v1/business-period/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createBusinessPeriod(businessPeriod: IBusinessPeriod): Observable<IBusinessPeriodCreateResponse> {
    return this._http
      .post<IBusinessPeriodCreateResponse>("api/v1/business-period", businessPeriod, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateBusinessPeriod(id: string, businessPeriod: IBusinessPeriod): Observable<IBusinessPeriodUpdateResponse> {
    return this._http
      .put<IBusinessPeriodUpdateResponse>(`api/v1/business-period/${id}`, businessPeriod, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteBusinessPeriod(id: string): Observable<IBusinessPeriodDeleteResponse> {
    return this._http
      .delete<IBusinessPeriodDeleteResponse>(`api/v1/business-period/${id}`, {
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

  public createTag(tag: ITag): Observable<ITagCreateResponse> {
    return this._http
      .post<ITagCreateResponse>("api/v1/tag", tag, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateTag(id: string, tag: ITag): Observable<ITagUpdateResponse> {
    return this._http
      .put<ITagUpdateResponse>(`api/v1/tag/${id}`, tag, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteTag(id: string): Observable<ITagDeleteResponse> {
    return this._http
      .delete<ITagDeleteResponse>(`api/v1/tag/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getTagAllAssets(tagId: string): Observable<ITagAssetGetResponse> {
    return this._http
      .get<ITagAssetGetResponse>(`api/v1/tag/${tagId}/assets`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getTagAllByLangAssets(tagId: string, langCode: string): Observable<ITagAssetGetByLangResponse> {
    return this._http
      .get<ITagAssetGetByLangResponse>(`api/v1/tag/${tagId}/assets/${langCode}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public uploadTagImage(tagId: string, type: TagImageTypes, data: IFileUploadEvent): Observable<ITagAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<ITagAssetCreateResponse>(`api/v1/tag/${tagId}/resource/${data.langCode}/${type}`, formData, {
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

  public createTagAsset(tagId: string, data: IFileUploadEvent): Observable<ITagAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<ITagAssetCreateResponse>(`api/v1/tag/${tagId}/asset/${data.langCode}`, formData, {
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

  public updateTagAsset(tagId: string, langCode: string, assetId: string, asset: {name?: string, active?: boolean}): Observable<ITagAssetUpdateResponse> {
    return this._http
      .put<ITagAssetUpdateResponse>(`api/v1/tag/${tagId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteTagAsset(tagId: string, langCode: string, assetId: string): Observable<ITagAssetDeleteResponse> {
    return this._http
      .delete<ITagAssetDeleteResponse>(`api/v1/tag/${tagId}/asset/${langCode}/${assetId}`, {
        headers: {
          authorization: this._token,
        },
      });
  }
  
  // currencies
  public getCurrencies(): Observable<ICurrenciesGetResponse> {
    return this._http
      .get<ICurrenciesGetResponse>("api/v1/currencies", {
        headers: {
          authorization: this._token,
        },
      });
  }
  
  public getCurrency(id: string): Observable<ICurrencyGetResponse> {
    return this._http
      .get<ICurrencyGetResponse>(`api/v1/currency/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createCurrency(currency: ICurrency): Observable<ICurrencyCreateResponse> {
    return this._http
      .post<ICurrencyCreateResponse>("api/v1/currency", currency, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateCurrency(id: string, currency: ICurrency): Observable<ICurrencyUpdateResponse> {
    return this._http
      .put<ICurrencyUpdateResponse>(`api/v1/currency/${id}`, currency, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteCurrency(id: string): Observable<ICurrencyDeleteResponse> {
    return this._http
      .delete<ICurrencyDeleteResponse>(`api/v1/currency/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }
  
  // order-types
  public getOrderTypes(): Observable<IOrderTypesGetResponse> {
    return this._http
      .get<IOrderTypesGetResponse>("api/v1/order-types", {
        headers: {
          authorization: this._token,
        },
      });
  }
  
  public getOrderType(id: string): Observable<IOrderTypeGetResponse> {
    return this._http
      .get<IOrderTypeGetResponse>(`api/v1/order-type/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createOrderType(orderType: IOrderType): Observable<IOrderTypeCreateResponse> {
    return this._http
      .post<IOrderTypeCreateResponse>("api/v1/order-type", orderType, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateOrderType(id: string, orderType: IOrderType): Observable<IOrderTypeUpdateResponse> {
    return this._http
      .put<IOrderTypeUpdateResponse>(`api/v1/order-type/${id}`, orderType, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteOrderType(id: string): Observable<IOrderTypeDeleteResponse> {
    return this._http
      .delete<IOrderTypeDeleteResponse>(`api/v1/order-type/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getOrderTypeAllAssets(orderTypeId: string): Observable<IOrderTypeAssetGetResponse> {
    return this._http
      .get<IOrderTypeAssetGetResponse>(`api/v1/order-type/${orderTypeId}/assets`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getOrderTypeAllByLangAssets(orderTypeId: string, langCode: string): Observable<IOrderTypeAssetGetByLangResponse> {
    return this._http
      .get<IOrderTypeAssetGetByLangResponse>(`api/v1/order-type/${orderTypeId}/assets/${langCode}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public uploadOrderTypeImage(orderTypeId: string, type: OrderTypeImageTypes, data: IFileUploadEvent): Observable<IOrderTypeAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IOrderTypeAssetCreateResponse>(`api/v1/order-type/${orderTypeId}/resource/${data.langCode}/${type}`, formData, {
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

  public createOrderTypeAsset(orderTypeId: string, data: IFileUploadEvent): Observable<IOrderTypeAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IOrderTypeAssetCreateResponse>(`api/v1/order-type/${orderTypeId}/asset/${data.langCode}`, formData, {
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

  public updateOrderTypeAsset(orderTypeId: string, langCode: string, assetId: string, asset: {name?: string, active?: boolean}): Observable<IOrderTypeAssetUpdateResponse> {
    return this._http
      .put<IOrderTypeAssetUpdateResponse>(`api/v1/order-type/${orderTypeId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteOrderTypeAsset(orderTypeId: string, langCode: string, assetId: string): Observable<IOrderTypeAssetDeleteResponse> {
    return this._http
      .delete<IOrderTypeAssetDeleteResponse>(`api/v1/order-type/${orderTypeId}/asset/${langCode}/${assetId}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  // languages
  public getLanguages(): Observable<ILanguagesGetResponse> {
    return this._http
      .get<ILanguagesGetResponse>("api/v1/languages", {
        headers: {
          authorization: this._token,
        },
      });
  }
  
  public getLanguage(id: string): Observable<ILanguageGetResponse> {
    return this._http
      .get<ILanguageGetResponse>(`api/v1/language/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public createLanguage(language: ILanguage): Observable<ILanguageCreateResponse> {
    return this._http
      .post<ILanguageCreateResponse>("api/v1/language", language, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateLanguage(id: string, language: ILanguage): Observable<ILanguageUpdateResponse> {
    return this._http
      .put<ILanguageUpdateResponse>(`api/v1/language/${id}`, language, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteLanguage(id: string): Observable<ILanguageDeleteResponse> {
    return this._http
      .delete<ILanguageDeleteResponse>(`api/v1/language/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public getLanguageAssets(orderTypeId: string): Observable<ILanguageAssetGetResponse> {
    return this._http
      .get<ILanguageAssetGetResponse>(`api/v1/language/${orderTypeId}/assets`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public uploadLanguageImage(languageId: string, type: LanguageImageTypes, file: File): Observable<ILanguageAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this._http
      .post<ILanguageAssetCreateResponse>(`api/v1/language/${languageId}/resource/${type}`, formData, {
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

  public createLanguageAsset(languageId: string, file: File): Observable<ILanguageAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this._http
      .post<ILanguageAssetCreateResponse>(`api/v1/language/${languageId}/asset`, formData, {
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

  public updateLanguageAsset(languageId: string, assetId: string, asset: {name?: string, active?: boolean}): Observable<ILanguageAssetUpdateResponse> {
    return this._http
      .put<ILanguageAssetUpdateResponse>(`api/v1/language/${languageId}/asset/${assetId}`, asset, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public deleteLanguageAsset(languagetId: string, assetId: string): Observable<ILanguageAssetDeleteResponse> {
    return this._http
      .delete<ILanguageAssetDeleteResponse>(`api/v1/language/${languagetId}/asset/${assetId}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  // translations
  public getTranslations(): Observable<ITranslationsGetResponse> {
    return this._http
      .get<ITranslationsGetResponse>("api/v1/translations", {
        headers: {
          authorization: this._token,
        },
      });
  }
  
  public getTranslation(id: string): Observable<ITranslationGetResponse> {
    return this._http
      .get<ITranslationGetResponse>(`api/v1/translation/${id}`, {
        headers: {
          authorization: this._token,
        },
      });
  }

  public updateTranslation(id: string, translation: ITranslation): Observable<ITranslationUpdateResponse> {
    return this._http
      .put<ITranslationUpdateResponse>(`api/v1/translation/${id}`, translation, {
        headers: {
          authorization: this._token,
        },
      });
  }
}

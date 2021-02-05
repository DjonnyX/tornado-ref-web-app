import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUserProfile, IAsset, IFileUploadEvent, ICaptcha } from '@models';
import {
  IUserSigninRequest, IUserSigninResponse, IUserSignupRequest, IUserSignupResponse,
  IUserResetPasswordRequest, IUserResetPasswordResponse, IUserForgotPasswordRequest,
  IUserForgotPasswordResponse, IProductsGetResponse, IProductsCreateResponse, IProductsUpdateResponse, IProductsDeleteResponse,
  ITagsGetResponse, ITagCreateResponse, ITagUpdateResponse, ITagDeleteResponse,
  ISelectorsGetResponse, ISelectorsCreateResponse, ISelectorsUpdateResponse, ISelectorsDeleteResponse,
  IMenuNodesGetResponse, IMenuNodesCreateResponse, IMenuNodesUpdateResponse, IMenuNodesDeleteResponse,
  IAssetsDeleteResponse, IAssetsUpdateResponse, IAssetsGetResponse,
  IProductAssetCreateResponse, IProductAssetUpdateResponse, IProductAssetDeleteResponse, IProductAssetGetResponse, IProductGetResponse,
  ITagGetResponse, ISelectorGetResponse,
  IBusinessPeriodsGetResponse, IBusinessPeriodGetResponse, IBusinessPeriodCreateResponse, IBusinessPeriodUpdateResponse, IBusinessPeriodDeleteResponse,
  ISelectorAssetDeleteResponse, ISelectorAssetGetResponse, ISelectorAssetCreateResponse, ISelectorAssetUpdateResponse,
  ICurrenciesGetResponse, ICurrencyGetResponse, ICurrencyCreateResponse, ICurrencyUpdateResponse, ICurrencyDeleteResponse,
  IOrderTypesGetResponse, IOrderTypeGetResponse, IOrderTypeCreateResponse, IOrderTypeUpdateResponse, IOrderTypeDeleteResponse,
  IOrderTypeAssetGetResponse, IOrderTypeAssetCreateResponse, IOrderTypeAssetUpdateResponse, IOrderTypeAssetDeleteResponse,
  ILanguagesGetResponse, ILanguageGetResponse, ILanguageCreateResponse, ILanguageUpdateResponse, ILanguageDeleteResponse,
  ILanguageAssetGetResponse, ILanguageAssetCreateResponse, ILanguageAssetUpdateResponse, ILanguageAssetDeleteResponse,
  ITranslationsGetResponse, ITranslationGetResponse, ITranslationUpdateResponse, IProductAssetGetByLangResponse, ISelectorAssetGetByLangResponse,
  ITagAssetGetResponse, ITagAssetCreateResponse, ITagAssetUpdateResponse, ITagAssetDeleteResponse,
  IAdsGetResponse, IAdGetResponse, IAdsCreateResponse, IAdsUpdateResponse, IAdsDeleteResponse,
  IAdAssetGetResponse, IAdAssetGetByLangResponse, IAdAssetCreateResponse, IAdAssetUpdateResponse, IAdAssetDeleteResponse,
  IStoresGetResponse, IStoreGetResponse, IStoreCreateResponse, IStoreUpdateResponse, IStoreDeleteResponse,
  ITerminalsGetResponse, ITerminalGetResponse, ITerminalUpdateResponse, ITerminalDeleteResponse,
  ILicensesGetResponse, ILicenseGetResponse, ILicenseUpdateResponse, ILicenseDeleteResponse,
  ILicenseTypesGetResponse, ILicenseTypeGetResponse, ILicenseTypeUpdateResponse, ILicenseTypeDeleteResponse,
  IApplicationsGetResponse, IApplicationGetResponse, IApplicationUpdateResponse, IApplicationDeleteResponse,
  IAuthCaptchaResponse, IIntegrationsGetResponse, IIntegrationGetResponse, IIntegrationUpdateResponse, IAccountGetResponse,
  IAccountsGetResponse, IAccountUpdateResponse, ILicensesAccountGetResponse, ILicenseAccountGetResponse,
} from './interfaces';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import { IProduct, ISelector, INode, ITag, SelectorTypes, IBusinessPeriod, ICurrency, IOrderType, ILanguage, LanguageResourceTypes, OrderTypeResourceTypes, SelectorResourceTypes, ProductResourceTypes, ITranslation, TagResourceTypes, IAd, AdResourceTypes, AdTypes, IStore, ITerminal, IApplication, IIntegration, IAccount } from '@djonnyx/tornado-types';
import { IOrderTypeAssetGetByLangResponse } from './interfaces/order-type-assets-get-by-lang-response.interface';
import { ITagAssetGetByLangResponse } from './interfaces/tag-assets-get-by-lang-response.interface';
import { IUserSignupParamsResponse } from './interfaces/user-signup-response.interface';
import { ILicense, ILicenseType, IRequestOptions } from '@djonnyx/tornado-types';
import { HttpParameterCodec } from "@angular/common/http";

export class HttpCustomUrlEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string { return standardEncoding(k); }
  encodeValue(v: string): string { return standardEncoding(v); }
  decodeKey(k: string): string { return decodeURIComponent(k); }
  decodeValue(v: string) { return decodeURIComponent(v); }
}
function standardEncoding(v: string): string {
  return encodeURIComponent(v);
}

const extractParams = (options?: IRequestOptions): HttpParams => {
  let httpParams = new HttpParams({ encoder: new HttpCustomUrlEncodingCodec() });
  /*if (!!options && !!options.pager) {
      httpParams = httpParams.set('page', String(options.pager.pageNum - 1));
      httpParams = httpParams.set('size', String(options.pager.pageSize));
  }*/
  // filter
  if (!!options && !!options.filter && options.filter.length > 0) {
    options.filter.forEach(f => {
      httpParams = httpParams.append(`${f.id}.${f.operation}`, String(f.value));
    });
  }
  // query
  if (!!options && !!options.queryParams) {
    const queryKeys = Object.keys(options.queryParams);
    if (queryKeys.length > 0) {
      queryKeys.forEach(key => {
        httpParams = httpParams.append(key, options.queryParams[key]);
      });
    }
  }
  //sort
  /*if(!!options && !!options.sort && options.sort.length > 0) {
      options.sort.forEach((s, idx, arr) => {
          httpParams = httpParams.append('sort', `${s.field},${s.dir}`);
      });
  }*/
  return httpParams;
}

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
    });
  }

  private getAuthToken(): string {
    return `Bearer ${this._token}`;
  }

  public getAuthCaptcha(): Observable<ICaptcha> {
    return this._http
      .get<IAuthCaptchaResponse>("api/v1/auth/captcha")
      .pipe(
        map(res => res.data),
      );
  }

  public signin(params: IUserSigninRequest): Observable<IUserProfile> {
    return this._http
      .post<IUserSigninResponse>("api/v1/auth/signin", params)
      .pipe(
        map(res => res.data),
      );
  }

  public signupParams(): Observable<{
    captcha: ICaptcha;
  }> {
    return this._http
      .get<IUserSignupParamsResponse>("api/v1/auth/signup")
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
      .get<IUserForgotPasswordResponse>("api/v1/auth/forgot-password", {
        params: params as any,
      })
      .pipe(
        map(res => res.data),
      );
  }

  public verifyResetPasswordToken(restorePassCode: string): Observable<{}> {
    return this._http
      .get<IUserResetPasswordResponse>("api/v1/auth/verify-reset-password-token", {
        params: {
          restorePassCode,
        }
      })
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

  // products
  public getProducts(): Observable<IProductsGetResponse> {
    return this._http
      .get<IProductsGetResponse>("api/v1/products", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getProduct(id: string): Observable<IProductGetResponse> {
    return this._http
      .get<IProductGetResponse>(`api/v1/product/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createProduct(product: IProduct): Observable<IProductsCreateResponse> {
    return this._http
      .post<IProductsCreateResponse>("api/v1/product", product, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateProduct(id: string, product: IProduct): Observable<IProductsUpdateResponse> {
    return this._http
      .put<IProductsUpdateResponse>(`api/v1/product/${id}`, product, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteProduct(id: string): Observable<IProductsDeleteResponse> {
    return this._http
      .delete<IProductsDeleteResponse>(`api/v1/product/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getProductAllAssets(productId: string): Observable<IProductAssetGetResponse> {
    return this._http
      .get<IProductAssetGetResponse>(`api/v1/product/${productId}/assets`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getProductAllByLangAssets(productId: string, langCode: string): Observable<IProductAssetGetByLangResponse> {
    return this._http
      .get<IProductAssetGetByLangResponse>(`api/v1/product/${productId}/assets/${langCode}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public uploadProductResource(productId: string, type: ProductResourceTypes, data: IFileUploadEvent): Observable<IProductAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IProductAssetCreateResponse>(`api/v1/product/${productId}/resource/${data.langCode}/${type}`, formData, {
        headers: {
          "authorization": this.getAuthToken(),
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
          "authorization": this.getAuthToken(),
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

  public updateProductAsset(productId: string, langCode: string, assetId: string, asset: { name?: string, active?: boolean }): Observable<IProductAssetUpdateResponse> {
    return this._http
      .put<IProductAssetUpdateResponse>(`api/v1/product/${productId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteProductAsset(productId: string, langCode: string, assetId: string): Observable<IProductAssetDeleteResponse> {
    return this._http
      .delete<IProductAssetDeleteResponse>(`api/v1/product/${productId}/asset/${langCode}/${assetId}`, {
        headers: {
          "authorization": this.getAuthToken(),
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
          "authorization": this.getAuthToken(),
        },
        params,
      });
  }

  public getSelector(id: string): Observable<ISelectorGetResponse> {
    return this._http
      .get<ISelectorGetResponse>(`api/v1/selector/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createSelector(selector: ISelector): Observable<ISelectorsCreateResponse> {
    return this._http
      .post<ISelectorsCreateResponse>("api/v1/selector", selector, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateSelector(id: string, selector: ISelector): Observable<ISelectorsUpdateResponse> {
    return this._http
      .put<ISelectorsUpdateResponse>(`api/v1/selector/${id}`, selector, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteSelector(id: string): Observable<ISelectorsDeleteResponse> {
    return this._http
      .delete<ISelectorsDeleteResponse>(`api/v1/selector/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getSelectorAllAssets(selectorId: string): Observable<ISelectorAssetGetResponse> {
    return this._http
      .get<ISelectorAssetGetResponse>(`api/v1/selector/${selectorId}/assets`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getSelectorAllByLangAssets(selectorId: string, langCode: string): Observable<ISelectorAssetGetByLangResponse> {
    return this._http
      .get<ISelectorAssetGetByLangResponse>(`api/v1/selector/${selectorId}/assets/${langCode}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public uploadSelectorResource(selectorId: string, type: SelectorResourceTypes, data: IFileUploadEvent): Observable<ISelectorAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<ISelectorAssetCreateResponse>(`api/v1/selector/${selectorId}/resource/${data.langCode}/${type}`, formData, {
        headers: {
          "authorization": this.getAuthToken(),
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
          "authorization": this.getAuthToken(),
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

  public updateSelectorAsset(selectorId: string, langCode: string, assetId: string, asset: { name?: string, active?: boolean }): Observable<ISelectorAssetUpdateResponse> {
    return this._http
      .put<ISelectorAssetUpdateResponse>(`api/v1/selector/${selectorId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteSelectorAsset(selectorId: string, langCode: string, assetId: string): Observable<ISelectorAssetDeleteResponse> {
    return this._http
      .delete<ISelectorAssetDeleteResponse>(`api/v1/selector/${selectorId}/asset/${langCode}/${assetId}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // businessPeriods
  public getBusinessPeriods(): Observable<IBusinessPeriodsGetResponse> {
    return this._http
      .get<IBusinessPeriodsGetResponse>("api/v1/business-periods", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getBusinessPeriod(id: string): Observable<IBusinessPeriodGetResponse> {
    return this._http
      .get<IBusinessPeriodGetResponse>(`api/v1/business-period/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createBusinessPeriod(businessPeriod: IBusinessPeriod): Observable<IBusinessPeriodCreateResponse> {
    return this._http
      .post<IBusinessPeriodCreateResponse>("api/v1/business-period", businessPeriod, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateBusinessPeriod(id: string, businessPeriod: IBusinessPeriod): Observable<IBusinessPeriodUpdateResponse> {
    return this._http
      .put<IBusinessPeriodUpdateResponse>(`api/v1/business-period/${id}`, businessPeriod, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteBusinessPeriod(id: string): Observable<IBusinessPeriodDeleteResponse> {
    return this._http
      .delete<IBusinessPeriodDeleteResponse>(`api/v1/business-period/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // assets
  public getAssets(): Observable<IAssetsGetResponse> {
    return this._http
      .get<IAssetsGetResponse>("api/v1/assets", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createAsset(asset: IAsset): Observable<any> { //IAssetsCreateResponse
    return this._http
      .post<any>("api/v1/asset", asset, {
        headers: {
          "authorization": this.getAuthToken(),
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
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteAsset(id: string): Observable<IAssetsDeleteResponse> {
    return this._http
      .delete<IAssetsDeleteResponse>(`api/v1/asset/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // root-nodes
  public getRootNodes(): Observable<IMenuNodesGetResponse> {
    return this._http
      .get<IMenuNodesGetResponse>("api/v1/root-nodes", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // menu-nodes
  public getNodes(id: string): Observable<IMenuNodesGetResponse> {
    return this._http
      .get<IMenuNodesGetResponse>(!!id ? `api/v1/nodes/${id}` : "api/v1/nodes", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createNode(node: INode): Observable<IMenuNodesCreateResponse> {
    return this._http
      .post<IMenuNodesCreateResponse>("api/v1/node", node, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateNode(id: string, node: INode): Observable<IMenuNodesUpdateResponse> {
    return this._http
      .put<IMenuNodesUpdateResponse>(`api/v1/node/${id}`, node, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteNode(id: string): Observable<IMenuNodesDeleteResponse> {
    return this._http
      .delete<IMenuNodesDeleteResponse>(`api/v1/node/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // tags
  public getTags(): Observable<ITagsGetResponse> {
    return this._http
      .get<ITagsGetResponse>("api/v1/tags", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getTag(id: string): Observable<ITagGetResponse> {
    return this._http
      .get<ITagGetResponse>(`api/v1/tag/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createTag(tag: ITag): Observable<ITagCreateResponse> {
    return this._http
      .post<ITagCreateResponse>("api/v1/tag", tag, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateTag(id: string, tag: ITag): Observable<ITagUpdateResponse> {
    return this._http
      .put<ITagUpdateResponse>(`api/v1/tag/${id}`, tag, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteTag(id: string): Observable<ITagDeleteResponse> {
    return this._http
      .delete<ITagDeleteResponse>(`api/v1/tag/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getTagAllAssets(tagId: string): Observable<ITagAssetGetResponse> {
    return this._http
      .get<ITagAssetGetResponse>(`api/v1/tag/${tagId}/assets`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getTagAllByLangAssets(tagId: string, langCode: string): Observable<ITagAssetGetByLangResponse> {
    return this._http
      .get<ITagAssetGetByLangResponse>(`api/v1/tag/${tagId}/assets/${langCode}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public uploadTagResource(tagId: string, type: TagResourceTypes, data: IFileUploadEvent): Observable<ITagAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<ITagAssetCreateResponse>(`api/v1/tag/${tagId}/resource/${data.langCode}/${type}`, formData, {
        headers: {
          "authorization": this.getAuthToken(),
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
          "authorization": this.getAuthToken(),
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

  public updateTagAsset(tagId: string, langCode: string, assetId: string, asset: { name?: string, active?: boolean }): Observable<ITagAssetUpdateResponse> {
    return this._http
      .put<ITagAssetUpdateResponse>(`api/v1/tag/${tagId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteTagAsset(tagId: string, langCode: string, assetId: string): Observable<ITagAssetDeleteResponse> {
    return this._http
      .delete<ITagAssetDeleteResponse>(`api/v1/tag/${tagId}/asset/${langCode}/${assetId}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // currencies
  public getCurrencies(): Observable<ICurrenciesGetResponse> {
    return this._http
      .get<ICurrenciesGetResponse>("api/v1/currencies", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getCurrency(id: string): Observable<ICurrencyGetResponse> {
    return this._http
      .get<ICurrencyGetResponse>(`api/v1/currency/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createCurrency(currency: ICurrency): Observable<ICurrencyCreateResponse> {
    return this._http
      .post<ICurrencyCreateResponse>("api/v1/currency", currency, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateCurrency(id: string, currency: ICurrency): Observable<ICurrencyUpdateResponse> {
    return this._http
      .put<ICurrencyUpdateResponse>(`api/v1/currency/${id}`, currency, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteCurrency(id: string): Observable<ICurrencyDeleteResponse> {
    return this._http
      .delete<ICurrencyDeleteResponse>(`api/v1/currency/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // order-types
  public getOrderTypes(): Observable<IOrderTypesGetResponse> {
    return this._http
      .get<IOrderTypesGetResponse>("api/v1/order-types", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getOrderType(id: string): Observable<IOrderTypeGetResponse> {
    return this._http
      .get<IOrderTypeGetResponse>(`api/v1/order-type/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createOrderType(orderType: IOrderType): Observable<IOrderTypeCreateResponse> {
    return this._http
      .post<IOrderTypeCreateResponse>("api/v1/order-type", orderType, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateOrderType(id: string, orderType: IOrderType): Observable<IOrderTypeUpdateResponse> {
    return this._http
      .put<IOrderTypeUpdateResponse>(`api/v1/order-type/${id}`, orderType, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteOrderType(id: string): Observable<IOrderTypeDeleteResponse> {
    return this._http
      .delete<IOrderTypeDeleteResponse>(`api/v1/order-type/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getOrderTypeAllAssets(orderTypeId: string): Observable<IOrderTypeAssetGetResponse> {
    return this._http
      .get<IOrderTypeAssetGetResponse>(`api/v1/order-type/${orderTypeId}/assets`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getOrderTypeAllByLangAssets(orderTypeId: string, langCode: string): Observable<IOrderTypeAssetGetByLangResponse> {
    return this._http
      .get<IOrderTypeAssetGetByLangResponse>(`api/v1/order-type/${orderTypeId}/assets/${langCode}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public uploadOrderTypeResource(orderTypeId: string, type: OrderTypeResourceTypes, data: IFileUploadEvent): Observable<IOrderTypeAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IOrderTypeAssetCreateResponse>(`api/v1/order-type/${orderTypeId}/resource/${data.langCode}/${type}`, formData, {
        headers: {
          "authorization": this.getAuthToken(),
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
          "authorization": this.getAuthToken(),
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

  public updateOrderTypeAsset(orderTypeId: string, langCode: string, assetId: string, asset: { name?: string, active?: boolean }): Observable<IOrderTypeAssetUpdateResponse> {
    return this._http
      .put<IOrderTypeAssetUpdateResponse>(`api/v1/order-type/${orderTypeId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteOrderTypeAsset(orderTypeId: string, langCode: string, assetId: string): Observable<IOrderTypeAssetDeleteResponse> {
    return this._http
      .delete<IOrderTypeAssetDeleteResponse>(`api/v1/order-type/${orderTypeId}/asset/${langCode}/${assetId}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // languages
  public getLanguages(): Observable<ILanguagesGetResponse> {
    return this._http
      .get<ILanguagesGetResponse>("api/v1/languages", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getLanguage(id: string): Observable<ILanguageGetResponse> {
    return this._http
      .get<ILanguageGetResponse>(`api/v1/language/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createLanguage(language: ILanguage): Observable<ILanguageCreateResponse> {
    return this._http
      .post<ILanguageCreateResponse>("api/v1/language", language, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateLanguage(id: string, language: ILanguage): Observable<ILanguageUpdateResponse> {
    return this._http
      .put<ILanguageUpdateResponse>(`api/v1/language/${id}`, language, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteLanguage(id: string): Observable<ILanguageDeleteResponse> {
    return this._http
      .delete<ILanguageDeleteResponse>(`api/v1/language/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getLanguageAssets(orderTypeId: string): Observable<ILanguageAssetGetResponse> {
    return this._http
      .get<ILanguageAssetGetResponse>(`api/v1/language/${orderTypeId}/assets`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public uploadLanguageResource(languageId: string, type: LanguageResourceTypes, file: File): Observable<ILanguageAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this._http
      .post<ILanguageAssetCreateResponse>(`api/v1/language/${languageId}/resource/${type}`, formData, {
        headers: {
          "authorization": this.getAuthToken(),
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
          "authorization": this.getAuthToken(),
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

  public updateLanguageAsset(languageId: string, assetId: string, asset: { name?: string, active?: boolean }): Observable<ILanguageAssetUpdateResponse> {
    return this._http
      .put<ILanguageAssetUpdateResponse>(`api/v1/language/${languageId}/asset/${assetId}`, asset, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteLanguageAsset(languagetId: string, assetId: string): Observable<ILanguageAssetDeleteResponse> {
    return this._http
      .delete<ILanguageAssetDeleteResponse>(`api/v1/language/${languagetId}/asset/${assetId}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // translations
  public getTranslations(): Observable<ITranslationsGetResponse> {
    return this._http
      .get<ITranslationsGetResponse>("api/v1/translations", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getTranslation(id: string): Observable<ITranslationGetResponse> {
    return this._http
      .get<ITranslationGetResponse>(`api/v1/translation/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateTranslation(id: string, translation: ITranslation): Observable<ITranslationUpdateResponse> {
    return this._http
      .put<ITranslationUpdateResponse>(`api/v1/translation/${id}`, translation, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // ads
  public getAds(type: AdTypes): Observable<IAdsGetResponse> {
    const params: any = {};
    if (!!type) {
      params.type = type;
    }

    return this._http
      .get<IAdsGetResponse>("api/v1/ads", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params,
      });
  }

  public getAd(id: string): Observable<IAdGetResponse> {
    return this._http
      .get<IAdGetResponse>(`api/v1/ad/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createAd(ad: IAd): Observable<IAdsCreateResponse> {
    return this._http
      .post<IAdsCreateResponse>("api/v1/ad", ad, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateAd(id: string, ad: IAd): Observable<IAdsUpdateResponse> {
    return this._http
      .put<IAdsUpdateResponse>(`api/v1/ad/${id}`, ad, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteAd(id: string): Observable<IAdsDeleteResponse> {
    return this._http
      .delete<IAdsDeleteResponse>(`api/v1/ad/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getAdAllAssets(adId: string): Observable<IAdAssetGetResponse> {
    return this._http
      .get<IAdAssetGetResponse>(`api/v1/ad/${adId}/assets`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getAdAllByLangAssets(adId: string, langCode: string): Observable<IAdAssetGetByLangResponse> {
    return this._http
      .get<IAdAssetGetByLangResponse>(`api/v1/ad/${adId}/assets/${langCode}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public uploadAdResource(adId: string, type: AdResourceTypes, data: IFileUploadEvent): Observable<IAdAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IAdAssetCreateResponse>(`api/v1/ad/${adId}/resource/${data.langCode}/${type}`, formData, {
        headers: {
          "authorization": this.getAuthToken(),
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

  public createAdAsset(adId: string, data: IFileUploadEvent): Observable<IAdAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IAdAssetCreateResponse>(`api/v1/ad/${adId}/asset/${data.langCode}`, formData, {
        headers: {
          "authorization": this.getAuthToken(),
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

  public updateAdAsset(adId: string, langCode: string, assetId: string, asset: { name?: string, active?: boolean }): Observable<IAdAssetUpdateResponse> {
    return this._http
      .put<IAdAssetUpdateResponse>(`api/v1/ad/${adId}/asset/${langCode}/${assetId}`, asset, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteAdAsset(adId: string, langCode: string, assetId: string): Observable<IAdAssetDeleteResponse> {
    return this._http
      .delete<IAdAssetDeleteResponse>(`api/v1/ad/${adId}/asset/${langCode}/${assetId}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // stores
  public getStores(): Observable<IStoresGetResponse> {
    return this._http
      .get<IStoresGetResponse>("api/v1/stores", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getStore(id: string): Observable<IStoreGetResponse> {
    return this._http
      .get<IStoreGetResponse>(`api/v1/store/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createStore(store: IStore): Observable<IStoreCreateResponse> {
    return this._http
      .post<IStoreCreateResponse>("api/v1/store", store, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateStore(id: string, store: IStore): Observable<IStoreUpdateResponse> {
    return this._http
      .put<IStoreUpdateResponse>(`api/v1/store/${id}`, store, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteStore(id: string): Observable<IStoreDeleteResponse> {
    return this._http
      .delete<IStoreDeleteResponse>(`api/v1/store/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // terminals
  public getTerminals(options?: IRequestOptions): Observable<ITerminalsGetResponse> {
    return this._http
      .get<ITerminalsGetResponse>("api/v1/terminals", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getTerminal(id: string): Observable<ITerminalGetResponse> {
    return this._http
      .get<ITerminalGetResponse>(`api/v1/terminal/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateTerminal(id: string, terminal: ITerminal): Observable<ITerminalUpdateResponse> {
    return this._http
      .put<ITerminalUpdateResponse>(`api/v1/terminal/${id}`, terminal, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteTerminal(id: string): Observable<ITerminalDeleteResponse> {
    return this._http
      .delete<ITerminalDeleteResponse>(`api/v1/terminal/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // licenses account
  public getLicensesAccount(): Observable<ILicensesAccountGetResponse> {
    return this._http
      .get<ILicensesAccountGetResponse>("api/v1/licenses/forClient", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getLicenseAccount(id: string): Observable<ILicenseAccountGetResponse> {
    return this._http
      .get<ILicenseAccountGetResponse>(`api/v1/license/forClient/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // licenses
  public getLicenses(): Observable<ILicensesGetResponse> {
    return this._http
      .get<ILicensesGetResponse>("api/v1/licenses", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getLicense(id: string): Observable<ILicenseGetResponse> {
    return this._http
      .get<ILicenseGetResponse>(`api/v1/license/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createLicense(license: ILicense): Observable<ILicenseUpdateResponse> {
    return this._http
      .post<ILicenseUpdateResponse>(`api/v1/license`, license, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateLicense(id: string, license: ILicense): Observable<ILicenseUpdateResponse> {
    return this._http
      .put<ILicenseUpdateResponse>(`api/v1/license/${id}`, license, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteLicense(id: string): Observable<ILicenseDeleteResponse> {
    return this._http
      .delete<ILicenseDeleteResponse>(`api/v1/license/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // license types
  public getLicenseTypes(): Observable<ILicenseTypesGetResponse> {
    return this._http
      .get<ILicenseTypesGetResponse>("api/v1/license-types", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getLicenseType(id: string): Observable<ILicenseTypeGetResponse> {
    return this._http
      .get<ILicenseTypeGetResponse>(`api/v1/license-type/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createLicenseType(licenseType: ILicenseType): Observable<ILicenseTypeUpdateResponse> {
    return this._http
      .post<ILicenseTypeUpdateResponse>(`api/v1/license-type`, licenseType, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateLicenseType(id: string, licenseType: ILicenseType): Observable<ILicenseTypeUpdateResponse> {
    return this._http
      .put<ILicenseTypeUpdateResponse>(`api/v1/license-type/${id}`, licenseType, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteLicenseType(id: string): Observable<ILicenseTypeDeleteResponse> {
    return this._http
      .delete<ILicenseTypeDeleteResponse>(`api/v1/license-type/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // applications
  public getApplications(): Observable<IApplicationsGetResponse> {
    return this._http
      .get<IApplicationsGetResponse>("api/v1/applications", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getApplication(id: string): Observable<IApplicationGetResponse> {
    return this._http
      .get<IApplicationGetResponse>(`api/v1/application/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createApplication(application: IApplication): Observable<IApplicationUpdateResponse> {
    return this._http
      .post<IApplicationUpdateResponse>("api/v1/application", application, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateApplication(id: string, application: IApplication): Observable<IApplicationUpdateResponse> {
    return this._http
      .put<IApplicationUpdateResponse>(`api/v1/application/${id}`, application, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteApplication(id: string): Observable<IApplicationDeleteResponse> {
    return this._http
      .delete<IApplicationDeleteResponse>(`api/v1/application/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // integrations
  public getIntegrations(): Observable<IIntegrationsGetResponse> {
    return this._http
      .get<IIntegrationsGetResponse>("api/v1/integrations", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getIntegration(id: string): Observable<IIntegrationGetResponse> {
    return this._http
      .get<IIntegrationGetResponse>(`api/v1/integration/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateIntegration(id: string, integration: IIntegration): Observable<IIntegrationUpdateResponse> {
    return this._http
      .put<IIntegrationUpdateResponse>(`api/v1/integration/${id}`, integration, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // accounts
  public getAccounts(): Observable<IAccountsGetResponse> {
    return this._http
      .get<IAccountsGetResponse>("api/v1/accounts", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getAccount(id: string): Observable<IAccountGetResponse> {
    return this._http
      .get<IAccountGetResponse>(`api/v1/account/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateAccount(id: string, account: IAccount): Observable<IAccountUpdateResponse> {
    return this._http
      .put<IAccountUpdateResponse>(`api/v1/account/${id}`, account, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }
}

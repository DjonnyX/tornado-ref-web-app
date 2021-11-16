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
  IBusinessPeriodsGetResponse, IBusinessPeriodGetResponse, IBusinessPeriodCreateResponse, IBusinessPeriodUpdateResponse,
  IBusinessPeriodDeleteResponse,
  ISelectorAssetDeleteResponse, ISelectorAssetGetResponse, ISelectorAssetCreateResponse, ISelectorAssetUpdateResponse,
  ICurrenciesGetResponse, ICurrencyGetResponse, ICurrencyCreateResponse, ICurrencyUpdateResponse, ICurrencyDeleteResponse,
  IOrderTypesGetResponse, IOrderTypeGetResponse, IOrderTypeCreateResponse, IOrderTypeUpdateResponse, IOrderTypeDeleteResponse,
  IOrderTypeAssetGetResponse, IOrderTypeAssetCreateResponse, IOrderTypeAssetUpdateResponse, IOrderTypeAssetDeleteResponse,
  ILanguagesGetResponse, ILanguageGetResponse, ILanguageCreateResponse, ILanguageUpdateResponse, ILanguageDeleteResponse,
  ILanguageAssetGetResponse, ILanguageAssetCreateResponse, ILanguageAssetUpdateResponse, ILanguageAssetDeleteResponse,
  ITranslationsGetResponse, ITranslationGetResponse, ITranslationUpdateResponse, IProductAssetGetByLangResponse,
  ISelectorAssetGetByLangResponse,
  ITagAssetGetResponse, ITagAssetCreateResponse, ITagAssetUpdateResponse, ITagAssetDeleteResponse,
  IAdsGetResponse, IAdGetResponse, IAdsCreateResponse, IAdsUpdateResponse, IAdsDeleteResponse,
  IAdAssetGetResponse, IAdAssetGetByLangResponse, IAdAssetCreateResponse, IAdAssetUpdateResponse, IAdAssetDeleteResponse,
  IStoresGetResponse, IStoreGetResponse, IStoreCreateResponse, IStoreUpdateResponse, IStoreDeleteResponse,
  ITerminalsGetResponse, ITerminalGetResponse, ITerminalUpdateResponse, ITerminalDeleteResponse,
  ILicensesGetResponse, ILicenseGetResponse, ILicenseUpdateResponse, ILicenseDeleteResponse,
  IApplicationsGetResponse, IApplicationGetResponse, IApplicationUpdateResponse, IApplicationDeleteResponse,
  IAuthCaptchaResponse, IIntegrationsGetResponse, IIntegrationGetResponse, IIntegrationUpdateResponse, IAccountGetResponse,
  IAccountsGetResponse, IAccountUpdateResponse, ILicensesAccountGetResponse, ILicenseAccountGetResponse, ICheckuesGetResponse,
  ICheckueGetResponse, ICheckueCreateResponse, ICheckueUpdateResponse, ICheckueDeleteResponse, IAppThemesGetResponse,
  IAppThemeGetResponse, IAppThemeCreateResponse, IAppThemeUpdateResponse, IAppThemeDeleteResponse, IEntityPositionsResponse,
  IIntegrationCreateResponse, IIntegrationDeleteResponse, IIntegrationServerInfoGetResponse, IUserChangeEmailRequest,
  IUserChangeEmailResponse, IUserResetEmailResponse,
  IUserResetEmailRequest, IAccountCreateResponse, IAccountCreateRequest, IRolesGetResponse, IRoleGetResponse,
  IRoleCreateResponse, IRoleUpdateResponse, IRoleDeleteResponse, IRefServerInfoGetResponse, IApplicationCreateResponse,
  ITarifsGetResponse, ITarifGetResponse, ITarifCreateResponse, ITarifUpdateResponse, ITarifDeleteResponse, ISubscriptionsGetResponse, ISubscriptionGetResponse, ISubscriptionUpdateResponse, ISubscriptionDeleteResponse, IWeightUnitsGetResponse, IWeightUnitGetResponse, IWeightUnitCreateResponse, IWeightUnitUpdateResponse, IWeightUnitDeleteResponse,
} from './interfaces';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import {
  IProduct, ISelector, INode, ITag, IBusinessPeriod, ICurrency, IOrderType, ILanguage,
  LanguageResourceTypes, OrderTypeResourceTypes, SelectorResourceTypes, ProductResourceTypes, ITranslation,
  TagResourceTypes, IAd, AdResourceTypes, IStore, ITerminal, IApplication, IIntegration, IAccount, ICheckue,
  ILicense, IRequestOptions, IAppTheme, TerminalTypes, ISystemTag, IEntityPosition, IIntegrationEditable, IRole, ITarif, ISubscription, IWeightUnit
} from '@djonnyx/tornado-types';
import { IOrderTypeAssetGetByLangResponse } from './interfaces/order-type-assets-get-by-lang-response.interface';
import { ITagAssetGetByLangResponse } from './interfaces/tag-assets-get-by-lang-response.interface';
import { IUserSignupParamsResponse } from './interfaces/user-signup-response.interface';
import { HttpParameterCodec } from "@angular/common/http";
import { IBackupClientCreateResponse } from './interfaces/backup-create-response.interface';
import { IBackupClientUploadResponse } from './interfaces/backup-upload-response.interface';
import { IAppThemeAssetGetResponse } from './interfaces/app-theme-assets-get-response.interface';
import { IAppThemeAssetCreateResponse } from './interfaces/app-theme-asset-create-response.interface';
import { IAppThemeAssetUpdateResponse } from './interfaces/app-theme-asset-update-response.interface';
import { IAppThemeAssetDeleteResponse } from './interfaces/app-theme-asset-delete-response.interface';
import { IMenuNodesCreateMultiResponse } from './interfaces/menu-nodes-create-multi-response.interface';
import { ISystemTagsGetResponse } from './interfaces/system-tags-get-response.interface';
import { ISystemTagGetResponse } from './interfaces/system-tag-get-response.interface';
import { ISystemTagCreateResponse } from './interfaces/system-tag-create-response.interface';
import { ISystemTagUpdateResponse } from './interfaces/system-tag-update-response.interface';
import { ISystemTagDeleteResponse } from './interfaces/system-tag-delete-response.interface';
import { LocalizationService } from './localization/localization.service';

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
  if (!!options && !!options.filter && options.filter.length > 0) {
    options.filter.forEach(f => {
      httpParams = httpParams.append(`${f.id}.${f.operation}`, String(f.value));
    });
  }
  if (!!options && !!options.queryParams) {
    const queryKeys = Object.keys(options.queryParams);
    if (queryKeys.length > 0) {
      queryKeys.forEach(key => {
        httpParams = httpParams.append(key, options.queryParams[key]);
      });
    }
  }
  return httpParams;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _token: string;

  constructor(private _http: HttpClient, private _store: Store<IAppState>, private _localization: LocalizationService) {
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

  public signup(params: IUserSignupRequest): Observable<{ client: string; owner: string; }> {
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

  public resetPassword(params: IUserResetPasswordRequest): Observable<{}> {
    return this._http
      .post<IUserResetPasswordResponse>("api/v1/auth/reset-password", params)
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

  public changeEmail(params: IUserChangeEmailRequest): Observable<IAccount> {
    return this._http
      .get<IUserChangeEmailResponse>("api/v1/account/change-email", {
        params: params as any,
        headers: {
          "authorization": this.getAuthToken(),
        },
      })
      .pipe(
        map(res => res.data),
      );
  }

  public resetEmail(params: IUserResetEmailRequest): Observable<{}> {
    return this._http
      .post<IUserResetEmailResponse>("api/v1/account/change-email", params)
      .pipe(
        map(res => res.data),
      );
  }

  public verifyResetEmailToken(restoreEmailCode: string): Observable<{}> {
    return this._http
      .get<IUserResetEmailResponse>("api/v1/account/verify-change-email-token", {
        params: {
          restoreEmailCode,
        }
      })
      .pipe(
        map(res => res.data),
      );
  }

  // backups
  public createClientBackups(): Observable<IBackupClientCreateResponse> {
    return this._http
      .post<IBackupClientCreateResponse>("api/v1/backup/client/create", {}, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public uploadBackup(file: File): Observable<IBackupClientUploadResponse> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this._http
      .post<IBackupClientUploadResponse>("api/v1/backup/client/upload", formData, {
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

  // products
  public getProducts(options?: IRequestOptions): Observable<IProductsGetResponse> {
    return this._http
      .get<IProductsGetResponse>("api/v1/products", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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

  public updateProduct(id: string, product: IProduct, options?: IRequestOptions): Observable<IProductsUpdateResponse> {
    return this._http
      .put<IProductsUpdateResponse>(`api/v1/product/${id}`, product, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public updateProductsPositions(positions: Array<IEntityPosition>, options?: IRequestOptions): Observable<IEntityPositionsResponse> {
    return this._http
      .put<IEntityPositionsResponse>("api/v1/products/positions", positions, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getSelectors(options?: IRequestOptions): Observable<ISelectorsGetResponse> {
    return this._http
      .get<ISelectorsGetResponse>("api/v1/selectors", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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

  public updateSelectorsPositions(positions: Array<IEntityPosition>, options?: IRequestOptions): Observable<IEntityPositionsResponse> {
    return this._http
      .put<IEntityPositionsResponse>("api/v1/selectors/positions", positions, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getBusinessPeriods(options?: IRequestOptions): Observable<IBusinessPeriodsGetResponse> {
    return this._http
      .get<IBusinessPeriodsGetResponse>("api/v1/business-periods", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getRootNodes(options?: IRequestOptions): Observable<IMenuNodesGetResponse> {
    return this._http
      .get<IMenuNodesGetResponse>("api/v1/root-nodes", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  // menu-nodes
  public getNodes(id?: string): Observable<IMenuNodesGetResponse> {
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

  public createNodes(nodes: Array<INode>): Observable<IMenuNodesCreateMultiResponse> {
    return this._http
      .post<IMenuNodesCreateMultiResponse>("api/v1/nodes", { nodes }, {
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
  public getTags(options?: IRequestOptions): Observable<ITagsGetResponse> {
    return this._http
      .get<ITagsGetResponse>("api/v1/tags", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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

  // weightUnits
  public getWeightUnits(options?: IRequestOptions): Observable<IWeightUnitsGetResponse> {
    return this._http
      .get<IWeightUnitsGetResponse>("api/v1/weight-unit", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getWeightUnit(id: string): Observable<IWeightUnitGetResponse> {
    return this._http
      .get<IWeightUnitGetResponse>(`api/v1/weight-unit/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createWeightUnit(weightUnit: IWeightUnit): Observable<IWeightUnitCreateResponse> {
    return this._http
      .post<IWeightUnitCreateResponse>("api/v1/weight-unit", weightUnit, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateWeightUnit(id: string, weightUnit: IWeightUnit): Observable<IWeightUnitUpdateResponse> {
    return this._http
      .put<IWeightUnitUpdateResponse>(`api/v1/weight-unit/${id}`, weightUnit, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteWeightUnit(id: string): Observable<IWeightUnitDeleteResponse> {
    return this._http
      .delete<IWeightUnitDeleteResponse>(`api/v1/weight-unit/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // currencies
  public getCurrencies(options?: IRequestOptions): Observable<ICurrenciesGetResponse> {
    return this._http
      .get<ICurrenciesGetResponse>("api/v1/currencies", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getOrderTypes(options?: IRequestOptions): Observable<IOrderTypesGetResponse> {
    return this._http
      .get<IOrderTypesGetResponse>("api/v1/order-types", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getLanguages(options?: IRequestOptions): Observable<ILanguagesGetResponse> {
    return this._http
      .get<ILanguagesGetResponse>("api/v1/languages", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getTranslations(options?: IRequestOptions): Observable<ITranslationsGetResponse> {
    return this._http
      .get<ITranslationsGetResponse>("api/v1/translations", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getAds(options?: IRequestOptions): Observable<IAdsGetResponse> {
    return this._http
      .get<IAdsGetResponse>("api/v1/ads", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getStores(options?: IRequestOptions): Observable<IStoresGetResponse> {
    return this._http
      .get<IStoresGetResponse>("api/v1/stores", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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
  public getLicensesAccount(options?: IRequestOptions): Observable<ILicensesAccountGetResponse> {
    return this._http
      .get<ILicensesAccountGetResponse>("api/v1/licenses/forClient", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getLicenseAccount(id: string, extended: boolean = false): Observable<ILicenseAccountGetResponse> {
    const params = !!extended ? {
      withoutIntegrationServerInfo: "false",
    } : {};
    return this._http
      .get<ILicenseAccountGetResponse>(`api/v1/license/forClient/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params,
      });
  }

  // licenses
  public getLicenses(options?: IRequestOptions): Observable<ILicensesGetResponse> {
    return this._http
      .get<ILicensesGetResponse>("api/v1/licenses", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getLicense(id: string, extended: boolean = false): Observable<ILicenseGetResponse> {
    const params = !!extended ? {
      withoutIntegrationServerInfo: "false",
    } : {};
    return this._http
      .get<ILicenseGetResponse>(`api/v1/license/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params,
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

  public unbindLicense(id: string): Observable<ILicenseUpdateResponse> {
    return this._http
      .put<ILicenseUpdateResponse>(`api/v1/license/unbind/${id}`, {}, {
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



  

  // subscriptions
  public getSubscriptions(options?: IRequestOptions): Observable<ISubscriptionsGetResponse> {
    return this._http
      .get<ISubscriptionsGetResponse>("api/v1/subscriptions", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getSubscription(id: string, extended: boolean = false): Observable<ISubscriptionGetResponse> {
    const params = !!extended ? {
      withoutIntegrationServerInfo: "false",
    } : {};
    return this._http
      .get<ISubscriptionGetResponse>(`api/v1/subscriptions/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params,
      });
  }

  public createSubscription(subscription: ISubscription): Observable<ISubscriptionUpdateResponse> {
    return this._http
      .post<ISubscriptionUpdateResponse>(`api/v1/subscriptions`, subscription, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateSubscription(id: string, subscription: ISubscription): Observable<ISubscriptionUpdateResponse> {
    return this._http
      .put<ISubscriptionUpdateResponse>(`api/v1/subscriptions/${id}`, subscription, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public activateNextPeriodSubscription(id: string, params: any): Observable<ISubscriptionUpdateResponse> {
    return this._http
      .put<ISubscriptionUpdateResponse>(`api/v1/subscriptions/activateNextPeriod/${id}`, {}, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteSubscription(id: string): Observable<ISubscriptionDeleteResponse> {
    return this._http
      .delete<ISubscriptionDeleteResponse>(`api/v1/subscriptions/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // applications
  public getApplications(options?: IRequestOptions): Observable<IApplicationsGetResponse> {
    return this._http
      .get<IApplicationsGetResponse>("api/v1/applications", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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

  public createApplication(application: IApplication): Observable<IApplicationCreateResponse> {
    return this._http
      .post<IApplicationCreateResponse>("api/v1/application", application, {
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

  // tarifs
  public getTarifs(options?: IRequestOptions): Observable<ITarifsGetResponse> {
    return this._http
      .get<ITarifsGetResponse>("api/v1/tarifs", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getTarif(id: string): Observable<ITarifGetResponse> {
    return this._http
      .get<ITarifGetResponse>(`api/v1/tarif/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createTarif(tarif: ITarif): Observable<ITarifCreateResponse> {
    return this._http
      .post<ITarifCreateResponse>("api/v1/tarif", tarif, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateTarif(id: string, tarif: ITarif): Observable<ITarifUpdateResponse> {
    return this._http
      .put<ITarifUpdateResponse>(`api/v1/tarif/${id}`, tarif, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteTarif(id: string): Observable<ITarifDeleteResponse> {
    return this._http
      .delete<ITarifDeleteResponse>(`api/v1/tarif/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // integration server info
  public getIntegrationServerInfo(host: string): Observable<IIntegrationServerInfoGetResponse> {
    return this._http
      .post<IIntegrationServerInfoGetResponse>("api/v1/integration/server-info", { host }, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // ref server info
  public getRefServerInfo(): Observable<IRefServerInfoGetResponse> {
    return this._http
      .get<IRefServerInfoGetResponse>("api/v1/info", {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // integrations
  public getIntegrations(options?: IRequestOptions): Observable<IIntegrationsGetResponse> {
    return this._http
      .get<IIntegrationsGetResponse>("api/v1/integrations", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getIntegration(id: string, secure?: string): Observable<IIntegrationGetResponse> {
    return this._http
      .get<IIntegrationGetResponse>(`api/v1/integration/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: {
          secure,
        }
      });
  }

  public createIntegration(integration: IIntegrationEditable, secure?: string): Observable<IIntegrationCreateResponse> {
    return this._http
      .post<IIntegrationCreateResponse>("api/v1/integration", integration, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: {
          secure,
        }
      });
  }

  public updateIntegration(id: string, integration: IIntegrationEditable, secure?: string): Observable<IIntegrationUpdateResponse> {
    return this._http
      .put<IIntegrationUpdateResponse>(`api/v1/integration/${id}`, integration, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: {
          secure,
        }
      });
  }

  public deleteIntegration(id: string): Observable<IIntegrationDeleteResponse> {
    return this._http
      .delete<IIntegrationDeleteResponse>(`api/v1/integration/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // accounts
  public getAccounts(options?: IRequestOptions): Observable<IAccountsGetResponse> {
    return this._http
      .get<IAccountsGetResponse>("api/v1/accounts", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
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

  public createAccount(params: IAccountCreateRequest): Observable<IAccount> {
    return this._http
      .post<IAccountCreateResponse>("api/v1/account", params, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: {
          language: this._localization.lang,
        },
      })
      .pipe(
        map(res => res.data),
      );
  }

  public updateAccount(id: string, account: IAccount): Observable<IAccountUpdateResponse> {
    return this._http
      .put<IAccountUpdateResponse>(`api/v1/account/${id}`, account, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteAccount(id: string): Observable<IAccountUpdateResponse> {
    return this._http
      .delete<IAccountUpdateResponse>(`api/v1/account/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // roles
  public getRoles(options?: IRequestOptions): Observable<IRolesGetResponse> {
    return this._http
      .get<IRolesGetResponse>("api/v1/roles", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getRole(id: string): Observable<IRoleGetResponse> {
    return this._http
      .get<IRoleGetResponse>(`api/v1/role/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createRole(params: IRole): Observable<IRoleCreateResponse> {
    return this._http
      .post<IRoleCreateResponse>("api/v1/role", params, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateRole(id: string, role: IRole): Observable<IRoleUpdateResponse> {
    return this._http
      .put<IRoleUpdateResponse>(`api/v1/role/${id}`, role, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteRole(id: string): Observable<IRoleDeleteResponse> {
    return this._http
      .delete<IRoleDeleteResponse>(`api/v1/role/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // checkues
  public getCheckues(options?: IRequestOptions): Observable<ICheckuesGetResponse> {
    return this._http
      .get<ICheckuesGetResponse>("api/v1/checkues", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getCheckue(id: string): Observable<ICheckueGetResponse> {
    return this._http
      .get<ICheckueGetResponse>(`api/v1/checkue/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createCheckue(checkue: ICheckue): Observable<ICheckueCreateResponse> {
    return this._http
      .post<ICheckueCreateResponse>("api/v1/checkue", checkue, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateCheckue(id: string, checkue: ICheckue): Observable<ICheckueUpdateResponse> {
    return this._http
      .put<ICheckueUpdateResponse>(`api/v1/checkue/${id}`, checkue, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteCheckue(id: string): Observable<ICheckueDeleteResponse> {
    return this._http
      .delete<ICheckueDeleteResponse>(`api/v1/checkue/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // themes
  public getAppThemes<T = any>(options?: IRequestOptions): Observable<IAppThemesGetResponse<T>> {
    return this._http
      .get<IAppThemesGetResponse<T>>("api/v1/app-themes", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getAppTheme<T = any>(id: string): Observable<IAppThemeGetResponse<T>> {
    return this._http
      .get<IAppThemeGetResponse<T>>(`api/v1/app-theme/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createAppTheme<T = any>(theme: IAppTheme, type: TerminalTypes): Observable<IAppThemeCreateResponse<T>> {
    return this._http
      .post<IAppThemeCreateResponse<T>>("api/v1/app-theme", { name: theme.name }, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: {
          type: String(type),
        },
      });
  }

  public updateAppTheme<T = any>(id: string, theme: IAppTheme): Observable<IAppThemeUpdateResponse<T>> {
    return this._http
      .put<IAppThemeUpdateResponse<T>>(`api/v1/app-theme/${id}`, { name: theme.name, data: theme.data }, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteAppTheme(id: string): Observable<IAppThemeDeleteResponse> {
    return this._http
      .delete<IAppThemeDeleteResponse>(`api/v1/app-theme/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public getAppThemeAllAssets(options?: IRequestOptions): Observable<IAppThemeAssetGetResponse> {
    return this._http
      .get<IAppThemeAssetGetResponse>(`api/v1/app-theme-assets`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public uploadAppThemeResource(themeId: string, type: string, data: IFileUploadEvent): Observable<IAppThemeAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IAppThemeAssetCreateResponse>(`api/v1/app-theme-assets/${themeId}/resource/${type}`, formData, {
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

  public deleteAppThemeResource(themeId: string, type: string): Observable<IAppThemeAssetDeleteResponse> {
    return this._http
      .delete<IAppThemeAssetDeleteResponse>(`api/v1/app-theme-assets/${themeId}/resource/${type}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createAppThemeAsset(themeId: string, data: IFileUploadEvent): Observable<IAppThemeAssetCreateResponse> {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);

    return this._http
      .post<IAppThemeAssetCreateResponse>(`api/v1/app-theme-assets/${themeId}/asset`, formData, {
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

  public updateAppThemeAsset(themeId: string, assetId: string, asset: { name?: string, active?: boolean }): Observable<IAppThemeAssetUpdateResponse> {
    return this._http
      .put<IAppThemeAssetUpdateResponse>(`api/v1/app-theme-assets/${themeId}/asset/${assetId}`, asset, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public deleteAppThemeAsset(themeId: string, assetId: string): Observable<IAppThemeAssetDeleteResponse> {
    return this._http
      .delete<IAppThemeAssetDeleteResponse>(`api/v1/app-theme-assets/${themeId}/asset/${assetId}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  // systemTags
  public getSystemTags(options?: IRequestOptions): Observable<ISystemTagsGetResponse> {
    return this._http
      .get<ISystemTagsGetResponse>("api/v1/system-tags", {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public getSystemTag(id: string): Observable<ISystemTagGetResponse> {
    return this._http
      .get<ISystemTagGetResponse>(`api/v1/system-tag/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public createSystemTag(systemTag: ISystemTag): Observable<ISystemTagCreateResponse> {
    return this._http
      .post<ISystemTagCreateResponse>("api/v1/system-tag", systemTag, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateSystemTag(id: string, systemTag: ISystemTag): Observable<ISystemTagUpdateResponse> {
    return this._http
      .put<ISystemTagUpdateResponse>(`api/v1/system-tag/${id}`, systemTag, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }

  public updateSystemTagsPositions(positions: Array<IEntityPosition>, options?: IRequestOptions): Observable<IEntityPositionsResponse> {
    return this._http
      .put<IEntityPositionsResponse>("api/v1/system-tags/positions", positions, {
        headers: {
          "authorization": this.getAuthToken(),
        },
        params: extractParams(options),
      });
  }

  public deleteSystemTag(id: string): Observable<ISystemTagDeleteResponse> {
    return this._http
      .delete<ISystemTagDeleteResponse>(`api/v1/system-tag/${id}`, {
        headers: {
          "authorization": this.getAuthToken(),
        },
      });
  }
}

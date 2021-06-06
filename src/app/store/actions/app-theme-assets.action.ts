import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';
import { IFileUploadEvent } from '@models';
import { IRequestOptions } from "@djonnyx/tornado-types";

export enum AppThemeAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/app-theme/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/app-theme/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/app-theme/assets/get-all:error",

    GET_REQUEST = "TORNADO/app-theme/assets/get:request",
    GET_SUCCESS = "TORNADO/app-theme/assets/get:success",
    GET_ERROR = "TORNADO/app-theme/assets/get:error",

    CREATE_REQUEST = "TORNADO/app-theme/assets/create:request",
    CREATE_SUCCESS = "TORNADO/app-theme/assets/create:success",
    CREATE_PROGRESS = "TORNADO/app-theme/assets/create:progress",
    CREATE_ERROR = "TORNADO/app-theme/assets/create:error",

    UPDATE_REQUEST = "TORNADO/app-theme/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/app-theme/assets/update:success",
    UPDATE_ERROR = "TORNADO/app-theme/assets/update:error",

    DELETE_REQUEST = "TORNADO/app-theme/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/app-theme/assets/delete:success",
    DELETE_ERROR = "TORNADO/app-theme/assets/delete:error",

    UPLOAD_RESOURCE_REQUEST = "TORNADO/app-theme/assets/upload-resources:request",
    UPLOAD_RESOURCE_PROGRESS = "TORNADO/app-theme/assets/upload-resources:progress",
    UPLOAD_RESOURCE_SUCCESS = "TORNADO/app-theme/assets/upload-resources:success",
    UPLOAD_RESOURCE_ERROR = "TORNADO/app-theme/assets/upload-resources:error",

    DELETE_RESOURCE_REQUEST = "TORNADO/app-theme/assets/delete-resources:request",
    DELETE_RESOURCE_SUCCESS = "TORNADO/app-theme/assets/delete-resources:success",
    DELETE_RESOURCE_ERROR = "TORNADO/app-theme/assets/delete-resources:error",

    CLEAR = "TORNADO/app-theme/assets/clear",
}

export namespace AppThemeAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        AppThemeAssetsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions, }>()
    );
    export const getAllSuccess = createAction(
        AppThemeAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAsset>, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        AppThemeAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        AppThemeAssetsActionTypes.CREATE_REQUEST,
        props<{ themeId: string, data: IFileUploadEvent, }>()
    );
    export const createSuccess = createAction(
        AppThemeAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        AppThemeAssetsActionTypes.CREATE_PROGRESS,
        props<{
            tmpAsset: IAsset,
            progress: {
                total: number,
                loaded: number,
                progress: number,
            }
        }>()
    );
    export const createError = createAction(
        AppThemeAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        AppThemeAssetsActionTypes.UPDATE_REQUEST,
        props<{ themeId: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        AppThemeAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        AppThemeAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        AppThemeAssetsActionTypes.DELETE_REQUEST,
        props<{ themeId: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        AppThemeAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        AppThemeAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // upload
    export const uploadResourceRequest = createAction(
        AppThemeAssetsActionTypes.UPLOAD_RESOURCE_REQUEST,
        props<{ themeId: string, resourcesType: string, data: IFileUploadEvent }>()
    );
    export const uploadResourceSuccess = createAction(
        AppThemeAssetsActionTypes.UPLOAD_RESOURCE_SUCCESS,
        props<{ asset: IAsset, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const uploadResourceProgress = createAction(
        AppThemeAssetsActionTypes.UPLOAD_RESOURCE_PROGRESS,
        props<{
            tmpAsset: IAsset,
            progress: {
                total: number,
                loaded: number,
                progress: number,
            }
        }>()
    );
    export const uploadResourceError = createAction(
        AppThemeAssetsActionTypes.UPLOAD_RESOURCE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // delete
    export const deleteResourceRequest = createAction(
        AppThemeAssetsActionTypes.DELETE_RESOURCE_REQUEST,
        props<{ themeId: string, resourcesType: string }>()
    );
    export const deleteResourceSuccess = createAction(
        AppThemeAssetsActionTypes.DELETE_RESOURCE_SUCCESS,
        props<{ id: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteResourceError = createAction(
        AppThemeAssetsActionTypes.DELETE_RESOURCE_ERROR,
        props<{
            error: string
        }>()
    );

    export const clear = createAction(
        AppThemeAssetsActionTypes.CLEAR,
    );
}

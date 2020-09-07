import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';
import { AdResourceTypes } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';

export enum AdAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/ad/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/ad/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/ad/assets/get-all:error",

    GET_ALL_BY_LANG_REQUEST = "TORNADO/ad/assets/get-all-by-lang:request",
    GET_ALL_BY_LANG_SUCCESS = "TORNADO/ad/assets/get-all-by-lang:success",
    GET_ALL_BY_LANG_ERROR = "TORNADO/ad/assets/get-all-by-lang:error",

    GET_REQUEST = "TORNADO/ad/assets/get:request",
    GET_SUCCESS = "TORNADO/ad/assets/get:success",
    GET_ERROR = "TORNADO/ad/assets/get:error",

    CREATE_REQUEST = "TORNADO/ad/assets/create:request",
    CREATE_SUCCESS = "TORNADO/ad/assets/create:success",
    CREATE_PROGRESS = "TORNADO/ad/assets/create:progress",
    CREATE_ERROR = "TORNADO/ad/assets/create:error",

    UPDATE_REQUEST = "TORNADO/ad/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/ad/assets/update:success",
    UPDATE_ERROR = "TORNADO/ad/assets/update:error",

    DELETE_REQUEST = "TORNADO/ad/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/ad/assets/delete:success",
    DELETE_ERROR = "TORNADO/ad/assets/delete:error",

    UPLOAD_RESOURCE_REQUEST = "TORNADO/ad/assets/upload-resources:request",
    UPLOAD_RESOURCE_PROGRESS = "TORNADO/ad/assets/upload-resources:progress",
    UPLOAD_RESOURCE_SUCCESS = "TORNADO/ad/assets/upload-resources:success",
    UPLOAD_RESOURCE_ERROR = "TORNADO/ad/assets/upload-resources:error",

    CLEAR = "TORNADO/ad/assets/clear",
}

export namespace AdAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        AdAssetsActionTypes.GET_ALL_REQUEST,
        props<{ adId: string, }>()
    );
    export const getAllSuccess = createAction(
        AdAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: { [lang: string]: Array<IAsset> }, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        AdAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // getAll
    export const getAllByLangRequest = createAction(
        AdAssetsActionTypes.GET_ALL_BY_LANG_REQUEST,
        props<{ adId: string, langCode: string, }>()
    );
    export const getAllByLangSuccess = createAction(
        AdAssetsActionTypes.GET_ALL_BY_LANG_SUCCESS,
        props<{ collection: Array<IAsset>, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const getAllByLangError = createAction(
        AdAssetsActionTypes.GET_ALL_BY_LANG_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        AdAssetsActionTypes.CREATE_REQUEST,
        props<{ adId: string, data: IFileUploadEvent, }>()
    );
    export const createSuccess = createAction(
        AdAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        AdAssetsActionTypes.CREATE_PROGRESS,
        props<{
            tmpAsset: IAsset,
            langCode: string,
            progress: {
                total: number,
                loaded: number,
                progress: number,
            }
        }>()
    );
    export const createError = createAction(
        AdAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        AdAssetsActionTypes.UPDATE_REQUEST,
        props<{ adId: string, langCode: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        AdAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        AdAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        AdAssetsActionTypes.DELETE_REQUEST,
        props<{ adId: string, langCode: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        AdAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        AdAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // upload
    export const uploadResourceRequest = createAction(
        AdAssetsActionTypes.UPLOAD_RESOURCE_REQUEST,
        props<{ adId: string, resourcesType: AdResourceTypes, data: IFileUploadEvent }>()
    );
    export const uploadResourceSuccess = createAction(
        AdAssetsActionTypes.UPLOAD_RESOURCE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const uploadResourceProgress = createAction(
        AdAssetsActionTypes.UPLOAD_RESOURCE_PROGRESS,
        props<{
            tmpAsset: IAsset,
            langCode: string,
            progress: {
                total: number,
                loaded: number,
                progress: number,
            }
        }>()
    );
    export const uploadResourceError = createAction(
        AdAssetsActionTypes.UPLOAD_RESOURCE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );


    export const clear = createAction(
        AdAssetsActionTypes.CLEAR,
    );
}

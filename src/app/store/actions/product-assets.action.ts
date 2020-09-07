import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';
import { ProductImageTypes } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';

export enum ProductAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/product/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/product/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/product/assets/get-all:error",

    GET_ALL_BY_LANG_REQUEST = "TORNADO/product/assets/get-all-by-lang:request",
    GET_ALL_BY_LANG_SUCCESS = "TORNADO/product/assets/get-all-by-lang:success",
    GET_ALL_BY_LANG_ERROR = "TORNADO/product/assets/get-all-by-lang:error",

    GET_REQUEST = "TORNADO/product/assets/get:request",
    GET_SUCCESS = "TORNADO/product/assets/get:success",
    GET_ERROR = "TORNADO/product/assets/get:error",

    CREATE_REQUEST = "TORNADO/product/assets/create:request",
    CREATE_SUCCESS = "TORNADO/product/assets/create:success",
    CREATE_PROGRESS = "TORNADO/product/assets/create:progress",
    CREATE_ERROR = "TORNADO/product/assets/create:error",

    UPDATE_REQUEST = "TORNADO/product/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/product/assets/update:success",
    UPDATE_ERROR = "TORNADO/product/assets/update:error",

    DELETE_REQUEST = "TORNADO/product/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/product/assets/delete:success",
    DELETE_ERROR = "TORNADO/product/assets/delete:error",

    UPLOAD_RESOURCE_REQUEST = "TORNADO/product/assets/upload-resources:request",
    UPLOAD_RESOURCE_PROGRESS = "TORNADO/product/assets/upload-resources:progress",
    UPLOAD_RESOURCE_SUCCESS = "TORNADO/product/assets/upload-resources:success",
    UPLOAD_RESOURCE_ERROR = "TORNADO/product/assets/upload-resources:error",

    CLEAR = "TORNADO/product/assets/clear",
}

export namespace ProductAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        ProductAssetsActionTypes.GET_ALL_REQUEST,
        props<{ productId: string, }>()
    );
    export const getAllSuccess = createAction(
        ProductAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: { [lang: string]: Array<IAsset> }, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        ProductAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // getAll
    export const getAllByLangRequest = createAction(
        ProductAssetsActionTypes.GET_ALL_BY_LANG_REQUEST,
        props<{ productId: string, langCode: string, }>()
    );
    export const getAllByLangSuccess = createAction(
        ProductAssetsActionTypes.GET_ALL_BY_LANG_SUCCESS,
        props<{ collection: Array<IAsset>, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const getAllByLangError = createAction(
        ProductAssetsActionTypes.GET_ALL_BY_LANG_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        ProductAssetsActionTypes.CREATE_REQUEST,
        props<{ productId: string, data: IFileUploadEvent, }>()
    );
    export const createSuccess = createAction(
        ProductAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        ProductAssetsActionTypes.CREATE_PROGRESS,
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
        ProductAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        ProductAssetsActionTypes.UPDATE_REQUEST,
        props<{ productId: string, langCode: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        ProductAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        ProductAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        ProductAssetsActionTypes.DELETE_REQUEST,
        props<{ productId: string, langCode: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        ProductAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        ProductAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // upload
    export const uploadImageRequest = createAction(
        ProductAssetsActionTypes.UPLOAD_RESOURCE_REQUEST,
        props<{ productId: string, resourcesType: ProductImageTypes, data: IFileUploadEvent }>()
    );
    export const uploadImageSuccess = createAction(
        ProductAssetsActionTypes.UPLOAD_RESOURCE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const uploadImageProgress = createAction(
        ProductAssetsActionTypes.UPLOAD_RESOURCE_PROGRESS,
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
    export const uploadImageError = createAction(
        ProductAssetsActionTypes.UPLOAD_RESOURCE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );


    export const clear = createAction(
        ProductAssetsActionTypes.CLEAR,
    );
}

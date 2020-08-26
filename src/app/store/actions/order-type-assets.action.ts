import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';
import { OrderTypeImageTypes } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';

export enum OrderTypeAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/orderType/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/orderType/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/orderType/assets/get-all:error",

    GET_ALL_BY_LANG_REQUEST = "TORNADO/orderType/assets/get-all-by-lang:request",
    GET_ALL_BY_LANG_SUCCESS = "TORNADO/orderType/assets/get-all-by-lang:success",
    GET_ALL_BY_LANG_ERROR = "TORNADO/orderType/assets/get-all-by-lang:error",

    GET_REQUEST = "TORNADO/orderType/assets/get:request",
    GET_SUCCESS = "TORNADO/orderType/assets/get:success",
    GET_ERROR = "TORNADO/orderType/assets/get:error",

    CREATE_REQUEST = "TORNADO/orderType/assets/create:request",
    CREATE_SUCCESS = "TORNADO/orderType/assets/create:success",
    CREATE_PROGRESS = "TORNADO/orderType/assets/create:progress",
    CREATE_ERROR = "TORNADO/orderType/assets/create:error",

    UPDATE_REQUEST = "TORNADO/orderType/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/orderType/assets/update:success",
    UPDATE_ERROR = "TORNADO/orderType/assets/update:error",

    DELETE_REQUEST = "TORNADO/orderType/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/orderType/assets/delete:success",
    DELETE_ERROR = "TORNADO/orderType/assets/delete:error",

    UPLOAD_IMAGE_REQUEST = "TORNADO/orderType/assets/upload-image:request",
    UPLOAD_IMAGE_PROGRESS = "TORNADO/orderType/assets/upload-image:progress",
    UPLOAD_IMAGE_SUCCESS = "TORNADO/orderType/assets/upload-image:success",
    UPLOAD_IMAGE_ERROR = "TORNADO/orderType/assets/upload-image:error",

    CLEAR = "TORNADO/orderType/assets/clear",
}

export namespace OrderTypeAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_REQUEST,
        props<{ orderTypeId: string, }>()
    );
    export const getAllSuccess = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: { [lang: string]: Array<IAsset> }, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // getAll
    export const getAllByLangRequest = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_BY_LANG_REQUEST,
        props<{ orderTypeId: string, langCode: string, }>()
    );
    export const getAllByLangSuccess = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_BY_LANG_SUCCESS,
        props<{ collection: Array<IAsset>, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const getAllByLangError = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_BY_LANG_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        OrderTypeAssetsActionTypes.CREATE_REQUEST,
        props<{ orderTypeId: string, data: IFileUploadEvent, }>()
    );
    export const createSuccess = createAction(
        OrderTypeAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        OrderTypeAssetsActionTypes.CREATE_PROGRESS,
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
        OrderTypeAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        OrderTypeAssetsActionTypes.UPDATE_REQUEST,
        props<{ orderTypeId: string, langCode: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        OrderTypeAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        OrderTypeAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        OrderTypeAssetsActionTypes.DELETE_REQUEST,
        props<{ orderTypeId: string, langCode: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        OrderTypeAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        OrderTypeAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // upload
    export const uploadImageRequest = createAction(
        OrderTypeAssetsActionTypes.UPLOAD_IMAGE_REQUEST,
        props<{ orderTypeId: string, imageType: OrderTypeImageTypes, data: IFileUploadEvent }>()
    );
    export const uploadImageSuccess = createAction(
        OrderTypeAssetsActionTypes.UPLOAD_IMAGE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const uploadImageProgress = createAction(
        OrderTypeAssetsActionTypes.UPLOAD_IMAGE_PROGRESS,
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
        OrderTypeAssetsActionTypes.UPLOAD_IMAGE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );


    export const clear = createAction(
        OrderTypeAssetsActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';
import { TagImageTypes } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';

export enum TagAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/tag/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/tag/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/tag/assets/get-all:error",

    GET_ALL_BY_LANG_REQUEST = "TORNADO/tag/assets/get-all-by-lang:request",
    GET_ALL_BY_LANG_SUCCESS = "TORNADO/tag/assets/get-all-by-lang:success",
    GET_ALL_BY_LANG_ERROR = "TORNADO/tag/assets/get-all-by-lang:error",

    GET_REQUEST = "TORNADO/tag/assets/get:request",
    GET_SUCCESS = "TORNADO/tag/assets/get:success",
    GET_ERROR = "TORNADO/tag/assets/get:error",

    CREATE_REQUEST = "TORNADO/tag/assets/create:request",
    CREATE_SUCCESS = "TORNADO/tag/assets/create:success",
    CREATE_PROGRESS = "TORNADO/tag/assets/create:progress",
    CREATE_ERROR = "TORNADO/tag/assets/create:error",

    UPDATE_REQUEST = "TORNADO/tag/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/tag/assets/update:success",
    UPDATE_ERROR = "TORNADO/tag/assets/update:error",

    DELETE_REQUEST = "TORNADO/tag/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/tag/assets/delete:success",
    DELETE_ERROR = "TORNADO/tag/assets/delete:error",

    UPLOAD_IMAGE_REQUEST = "TORNADO/tag/assets/upload-resources:request",
    UPLOAD_IMAGE_PROGRESS = "TORNADO/tag/assets/upload-resources:progress",
    UPLOAD_IMAGE_SUCCESS = "TORNADO/tag/assets/upload-resources:success",
    UPLOAD_IMAGE_ERROR = "TORNADO/tag/assets/upload-resources:error",

    CLEAR = "TORNADO/tag/assets/clear",
}

export namespace TagAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        TagAssetsActionTypes.GET_ALL_REQUEST,
        props<{ tagId: string, }>()
    );
    export const getAllSuccess = createAction(
        TagAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: { [lang: string]: Array<IAsset> }, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        TagAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // getAll
    export const getAllByLangRequest = createAction(
        TagAssetsActionTypes.GET_ALL_BY_LANG_REQUEST,
        props<{ tagId: string, langCode: string, }>()
    );
    export const getAllByLangSuccess = createAction(
        TagAssetsActionTypes.GET_ALL_BY_LANG_SUCCESS,
        props<{ collection: Array<IAsset>, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const getAllByLangError = createAction(
        TagAssetsActionTypes.GET_ALL_BY_LANG_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        TagAssetsActionTypes.CREATE_REQUEST,
        props<{ tagId: string, data: IFileUploadEvent, }>()
    );
    export const createSuccess = createAction(
        TagAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        TagAssetsActionTypes.CREATE_PROGRESS,
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
        TagAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        TagAssetsActionTypes.UPDATE_REQUEST,
        props<{ tagId: string, langCode: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        TagAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        TagAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        TagAssetsActionTypes.DELETE_REQUEST,
        props<{ tagId: string, langCode: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        TagAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        TagAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // upload
    export const uploadImageRequest = createAction(
        TagAssetsActionTypes.UPLOAD_IMAGE_REQUEST,
        props<{ tagId: string, resourcesType: TagImageTypes, data: IFileUploadEvent }>()
    );
    export const uploadImageSuccess = createAction(
        TagAssetsActionTypes.UPLOAD_IMAGE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const uploadImageProgress = createAction(
        TagAssetsActionTypes.UPLOAD_IMAGE_PROGRESS,
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
        TagAssetsActionTypes.UPLOAD_IMAGE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );


    export const clear = createAction(
        TagAssetsActionTypes.CLEAR,
    );
}

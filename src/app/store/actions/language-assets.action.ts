import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';
import { LanguageImageTypes } from '@djonnyx/tornado-types';
import { IFileUploadEvent } from '@models';

export enum LanguageAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/language/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/language/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/language/assets/get-all:error",

    GET_ALL_BY_LANG_REQUEST = "TORNADO/language/assets/get-all-by-lang:request",
    GET_ALL_BY_LANG_SUCCESS = "TORNADO/language/assets/get-all-by-lang:success",
    GET_ALL_BY_LANG_ERROR = "TORNADO/language/assets/get-all-by-lang:error",

    GET_REQUEST = "TORNADO/language/assets/get:request",
    GET_SUCCESS = "TORNADO/language/assets/get:success",
    GET_ERROR = "TORNADO/language/assets/get:error",

    CREATE_REQUEST = "TORNADO/language/assets/create:request",
    CREATE_SUCCESS = "TORNADO/language/assets/create:success",
    CREATE_PROGRESS = "TORNADO/language/assets/create:progress",
    CREATE_ERROR = "TORNADO/language/assets/create:error",

    UPDATE_REQUEST = "TORNADO/language/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/language/assets/update:success",
    UPDATE_ERROR = "TORNADO/language/assets/update:error",

    DELETE_REQUEST = "TORNADO/language/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/language/assets/delete:success",
    DELETE_ERROR = "TORNADO/language/assets/delete:error",

    UPLOAD_IMAGE_REQUEST = "TORNADO/language/assets/upload-image:request",
    UPLOAD_IMAGE_PROGRESS = "TORNADO/language/assets/upload-image:progress",
    UPLOAD_IMAGE_SUCCESS = "TORNADO/language/assets/upload-image:success",
    UPLOAD_IMAGE_ERROR = "TORNADO/language/assets/upload-image:error",

    CLEAR = "TORNADO/language/assets/clear",
}

export namespace LanguageAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        LanguageAssetsActionTypes.GET_ALL_REQUEST,
        props<{ languageId: string, }>()
    );
    export const getAllSuccess = createAction(
        LanguageAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: { [lang: string]: Array<IAsset> }, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        LanguageAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // getAll
    export const getAllByLangRequest = createAction(
        LanguageAssetsActionTypes.GET_ALL_BY_LANG_REQUEST,
        props<{ languageId: string, langCode: string, }>()
    );
    export const getAllByLangSuccess = createAction(
        LanguageAssetsActionTypes.GET_ALL_BY_LANG_SUCCESS,
        props<{ collection: Array<IAsset>, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const getAllByLangError = createAction(
        LanguageAssetsActionTypes.GET_ALL_BY_LANG_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        LanguageAssetsActionTypes.CREATE_REQUEST,
        props<{ languageId: string, data: IFileUploadEvent, }>()
    );
    export const createSuccess = createAction(
        LanguageAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        LanguageAssetsActionTypes.CREATE_PROGRESS,
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
        LanguageAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        LanguageAssetsActionTypes.UPDATE_REQUEST,
        props<{ languageId: string, langCode: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        LanguageAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        LanguageAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        LanguageAssetsActionTypes.DELETE_REQUEST,
        props<{ languageId: string, langCode: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        LanguageAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, langCode: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        LanguageAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // upload
    export const uploadImageRequest = createAction(
        LanguageAssetsActionTypes.UPLOAD_IMAGE_REQUEST,
        props<{ languageId: string, imageType: LanguageImageTypes, data: IFileUploadEvent }>()
    );
    export const uploadImageSuccess = createAction(
        LanguageAssetsActionTypes.UPLOAD_IMAGE_SUCCESS,
        props<{ asset: IAsset, langCode: string, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const uploadImageProgress = createAction(
        LanguageAssetsActionTypes.UPLOAD_IMAGE_PROGRESS,
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
        LanguageAssetsActionTypes.UPLOAD_IMAGE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );


    export const clear = createAction(
        LanguageAssetsActionTypes.CLEAR,
    );
}

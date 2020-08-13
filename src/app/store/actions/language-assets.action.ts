import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';

export enum LanguageAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/language/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/language/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/language/assets/get-all:error",

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
        props<{ collection: Array<IAsset>, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        LanguageAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        LanguageAssetsActionTypes.GET_REQUEST,
        props<{ assetId: string }>()
    );
    export const getSuccess = createAction(
        LanguageAssetsActionTypes.GET_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        LanguageAssetsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        LanguageAssetsActionTypes.CREATE_REQUEST,
        props<{ languageId: string, file: File, }>()
    );
    export const createSuccess = createAction(
        LanguageAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        LanguageAssetsActionTypes.CREATE_PROGRESS,
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
        LanguageAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        LanguageAssetsActionTypes.UPDATE_REQUEST,
        props<{ languageId: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        LanguageAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        LanguageAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        LanguageAssetsActionTypes.DELETE_REQUEST,
        props<{ languageId: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        LanguageAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        LanguageAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );
    
    export const clear = createAction(
        LanguageAssetsActionTypes.CLEAR,
    );
}

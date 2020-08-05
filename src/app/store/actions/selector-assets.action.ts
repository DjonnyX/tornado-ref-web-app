import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';

export enum SelectorAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/selector/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/selector/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/selector/assets/get-all:error",

    GET_REQUEST = "TORNADO/selector/assets/get:request",
    GET_SUCCESS = "TORNADO/selector/assets/get:success",
    GET_ERROR = "TORNADO/selector/assets/get:error",

    CREATE_REQUEST = "TORNADO/selector/assets/create:request",
    CREATE_SUCCESS = "TORNADO/selector/assets/create:success",
    CREATE_PROGRESS = "TORNADO/selector/assets/create:progress",
    CREATE_ERROR = "TORNADO/selector/assets/create:error",

    UPDATE_REQUEST = "TORNADO/selector/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/selector/assets/update:success",
    UPDATE_ERROR = "TORNADO/selector/assets/update:error",

    DELETE_REQUEST = "TORNADO/selector/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/selector/assets/delete:success",
    DELETE_ERROR = "TORNADO/selector/assets/delete:error",

    CLEAR = "TORNADO/selector/assets/clear",
}

export namespace SelectorAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        SelectorAssetsActionTypes.GET_ALL_REQUEST,
        props<{ selectorId: string, }>()
    );
    export const getAllSuccess = createAction(
        SelectorAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAsset>, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        SelectorAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        SelectorAssetsActionTypes.GET_REQUEST,
        props<{ assetId: string }>()
    );
    export const getSuccess = createAction(
        SelectorAssetsActionTypes.GET_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        SelectorAssetsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        SelectorAssetsActionTypes.CREATE_REQUEST,
        props<{ selectorId: string, file: File, }>()
    );
    export const createSuccess = createAction(
        SelectorAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        SelectorAssetsActionTypes.CREATE_PROGRESS,
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
        SelectorAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        SelectorAssetsActionTypes.UPDATE_REQUEST,
        props<{ selectorId: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        SelectorAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        SelectorAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        SelectorAssetsActionTypes.DELETE_REQUEST,
        props<{ selectorId: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        SelectorAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        SelectorAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );
    
    export const clear = createAction(
        SelectorAssetsActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';

export enum AssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/assets/get-all:error",

    GET_REQUEST = "TORNADO/assets/get:request",
    GET_SUCCESS = "TORNADO/assets/get:success",
    GET_ERROR = "TORNADO/assets/get:error",

    CREATE_REQUEST = "TORNADO/assets/create:request",
    CREATE_SUCCESS = "TORNADO/assets/create:success",
    CREATE_ERROR = "TORNADO/assets/create:error",

    UPDATE_REQUEST = "TORNADO/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/assets/update:success",
    UPDATE_ERROR = "TORNADO/assets/update:error",

    DELETE_REQUEST = "TORNADO/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/assets/delete:success",
    DELETE_ERROR = "TORNADO/assets/delete:error",
    
    CLEAR = "TORNADO/assets/clear",
}

export namespace AssetsActions {
    // getAll
    export const getAllRequest = createAction(
        AssetsActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        AssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAsset>, meta: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        AssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        AssetsActionTypes.GET_REQUEST,
        props<{ assetId: string }>()
    );
    export const getSuccess = createAction(
        AssetsActionTypes.GET_SUCCESS,
        props<{ asset: IAsset, meta: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        AssetsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        AssetsActionTypes.CREATE_REQUEST,
        props<IAsset>()
    );
    export const createSuccess = createAction(
        AssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, meta: IMetaRefsResponse }>()
    );
    export const createError = createAction(
        AssetsActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        AssetsActionTypes.UPDATE_REQUEST,
        props<{ id: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        AssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, meta: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        AssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        AssetsActionTypes.DELETE_REQUEST,
        props<{ id: string }>()
    );
    export const deleteSuccess = createAction(
        AssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        AssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        AssetsActionTypes.CLEAR,
    );
}

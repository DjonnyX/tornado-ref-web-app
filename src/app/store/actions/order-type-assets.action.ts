import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';

export enum OrderTypeAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/order-type/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/order-type/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/order-type/assets/get-all:error",

    GET_REQUEST = "TORNADO/order-type/assets/get:request",
    GET_SUCCESS = "TORNADO/order-type/assets/get:success",
    GET_ERROR = "TORNADO/order-type/assets/get:error",

    CREATE_REQUEST = "TORNADO/order-type/assets/create:request",
    CREATE_SUCCESS = "TORNADO/order-type/assets/create:success",
    CREATE_PROGRESS = "TORNADO/order-type/assets/create:progress",
    CREATE_ERROR = "TORNADO/order-type/assets/create:error",

    UPDATE_REQUEST = "TORNADO/order-type/assets/update:request",
    UPDATE_SUCCESS = "TORNADO/order-type/assets/update:success",
    UPDATE_ERROR = "TORNADO/order-type/assets/update:error",

    DELETE_REQUEST = "TORNADO/order-type/assets/delete:request",
    DELETE_SUCCESS = "TORNADO/order-type/assets/delete:success",
    DELETE_ERROR = "TORNADO/order-type/assets/delete:error",

    CLEAR = "TORNADO/order-type/assets/clear",
}

export namespace OrderTypeAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_REQUEST,
        props<{ orderTypeId: string, }>()
    );
    export const getAllSuccess = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAsset>, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        OrderTypeAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        OrderTypeAssetsActionTypes.GET_REQUEST,
        props<{ assetId: string }>()
    );
    export const getSuccess = createAction(
        OrderTypeAssetsActionTypes.GET_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        OrderTypeAssetsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        OrderTypeAssetsActionTypes.CREATE_REQUEST,
        props<{ orderTypeId: string, file: File, }>()
    );
    export const createSuccess = createAction(
        OrderTypeAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        OrderTypeAssetsActionTypes.CREATE_PROGRESS,
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
        OrderTypeAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        OrderTypeAssetsActionTypes.UPDATE_REQUEST,
        props<{ orderTypeId: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        OrderTypeAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        OrderTypeAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        OrderTypeAssetsActionTypes.DELETE_REQUEST,
        props<{ orderTypeId: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        OrderTypeAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        OrderTypeAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );
    
    export const clear = createAction(
        OrderTypeAssetsActionTypes.CLEAR,
    );
}

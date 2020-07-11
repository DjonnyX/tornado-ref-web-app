import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@app/models/asset.model';

export enum ProductAssetsActionTypes {
    GET_ALL_REQUEST = "TORNADO/product/assets/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/product/assets/get-all:success",
    GET_ALL_ERROR = "TORNADO/product/assets/get-all:error",

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
}

export namespace ProductAssetsActions {
    // getAll
    export const getAllRequest = createAction(
        ProductAssetsActionTypes.GET_ALL_REQUEST,
        props<{ productId: string, }>()
    );
    export const getAllSuccess = createAction(
        ProductAssetsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAsset>, meta?: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        ProductAssetsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        ProductAssetsActionTypes.GET_REQUEST,
        props<{ assetId: string }>()
    );
    export const getSuccess = createAction(
        ProductAssetsActionTypes.GET_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        ProductAssetsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        ProductAssetsActionTypes.CREATE_REQUEST,
        props<{ productId: string, file: File, }>()
    );
    export const createSuccess = createAction(
        ProductAssetsActionTypes.CREATE_SUCCESS,
        props<{ asset: IAsset, tmpAsset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const createProgress = createAction(
        ProductAssetsActionTypes.CREATE_PROGRESS,
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
        ProductAssetsActionTypes.CREATE_ERROR,
        props<{
            tmpAsset: IAsset,
            error: string
        }>()
    );

    // update
    export const updateRequest = createAction(
        ProductAssetsActionTypes.UPDATE_REQUEST,
        props<{ productId: string, asset: IAsset }>()
    );
    export const updateSuccess = createAction(
        ProductAssetsActionTypes.UPDATE_SUCCESS,
        props<{ asset: IAsset, meta?: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        ProductAssetsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        ProductAssetsActionTypes.DELETE_REQUEST,
        props<{ productId: string, assetId: string }>()
    );
    export const deleteSuccess = createAction(
        ProductAssetsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta?: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        ProductAssetsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );
}

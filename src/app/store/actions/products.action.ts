import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IProduct } from '@app/models/product.model';
import { IAsset } from '@models';

export enum ProductsActionTypes {
    GET_ALL_REQUEST = "TORNADO/products/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/products/get-all:success",
    GET_ALL_ERROR = "TORNADO/products/get-all:error",

    GET_REQUEST = "TORNADO/products/get:request",
    GET_SUCCESS = "TORNADO/products/get:success",
    GET_ERROR = "TORNADO/products/get:error",

    CREATE_REQUEST = "TORNADO/products/create:request",
    CREATE_SUCCESS = "TORNADO/products/create:success",
    CREATE_ERROR = "TORNADO/products/create:error",

    UPDATE_REQUEST = "TORNADO/products/update:request",
    UPDATE_SUCCESS = "TORNADO/products/update:success",
    UPDATE_ERROR = "TORNADO/products/update:error",

    DELETE_REQUEST = "TORNADO/products/delete:request",
    DELETE_SUCCESS = "TORNADO/products/delete:success",
    DELETE_ERROR = "TORNADO/products/delete:error",

    // комбинированное действие
    UPLOAD_ASSET_REQUEST = "TORNADO/products/asset/upload:request",
    UPLOAD_ASSET_SUCCESS = "TORNADO/products/asset/upload:success",
    UPLOAD_ASSET_ERROR = "TORNADO/products/asset/upload:error",

    // комбинированное действие
    DELETE_ASSET_REQUEST = "TORNADO/products/asset/delete:request",
    DELETE_ASSET_SUCCESS = "TORNADO/products/asset/delete:success",
    DELETE_ASSET_ERROR = "TORNADO/products/asset/delete:error",

    ADD_ASSET_REQUEST = "TORNADO/products/assets/add:request",
    ADD_ASSET_SUCCESS = "TORNADO/products/assets/add:success",
    ADD_ASSET_ERROR = "TORNADO/products/assets/add:error",

    REMOVE_ASSET_REQUEST = "TORNADO/products/assets/remove:request",
    REMOVE_ASSET_SUCCESS = "TORNADO/products/assets/remove:success",
    REMOVE_ASSET_ERROR = "TORNADO/products/assets/remove:error",

    NEW = "TORNADO/products/new",

    EDIT = "TORNADO/products/edit",
}

export namespace ProductsActions {
    // getAll
    export const getAllRequest = createAction(
        ProductsActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        ProductsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IProduct>, meta: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        ProductsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        ProductsActionTypes.GET_REQUEST,
        props<{ productId: string }>()
    );
    export const getSuccess = createAction(
        ProductsActionTypes.GET_SUCCESS,
        props<{ product: IProduct, meta: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        ProductsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        ProductsActionTypes.CREATE_REQUEST,
        props<IProduct>()
    );
    export const createSuccess = createAction(
        ProductsActionTypes.CREATE_SUCCESS,
        props<{ product: IProduct, meta: IMetaRefsResponse }>()
    );
    export const createError = createAction(
        ProductsActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        ProductsActionTypes.UPDATE_REQUEST,
        props<{ id: string, product: IProduct }>()
    );
    export const updateSuccess = createAction(
        ProductsActionTypes.UPDATE_SUCCESS,
        props<{ product: IProduct, meta: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        ProductsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        ProductsActionTypes.DELETE_REQUEST,
        props<{ id: string }>()
    );
    export const deleteSuccess = createAction(
        ProductsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        ProductsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    // tmp
    export const setNewProduct = createAction(
        ProductsActionTypes.NEW,
        props<{ product: IProduct }>()
    );

    export const setEditProduct = createAction(
        ProductsActionTypes.EDIT,
        props<{ product: IProduct }>()
    );

    // asset
    export const uploadAssetRequest = createAction(
        ProductsActionTypes.UPLOAD_ASSET_REQUEST,
        props<{ productId: string, file: File, }>()
    );
    export const uploadAssetSuccess = createAction(
        ProductsActionTypes.UPLOAD_ASSET_SUCCESS,
        props<{
            product: IProduct,
            asset: IAsset,
            meta: {
                product: IMetaRefsResponse;
                asset: IMetaRefsResponse;
            }
        }>()
    );
    export const uploadAssetError = createAction(
        ProductsActionTypes.UPLOAD_ASSET_ERROR,
        props<{ error: string }>()
    );

    export const removeAssetRequest = createAction(
        ProductsActionTypes.UPLOAD_ASSET_REQUEST,
        props<{ productId: string, assetId: string, }>()
    );
    export const removeAssetSuccess = createAction(
        ProductsActionTypes.UPLOAD_ASSET_SUCCESS,
        props<{
            productId: string;
            assetId: string;
            meta: {
                product: IMetaRefsResponse;
                asset: IMetaRefsResponse;
            }
        }>()
    );
    export const removeAssetError = createAction(
        ProductsActionTypes.UPLOAD_ASSET_ERROR,
        props<{ error: string }>()
    );
}

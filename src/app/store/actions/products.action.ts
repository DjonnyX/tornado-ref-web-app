import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IProduct } from '@djonnyx/tornado-types';

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
}

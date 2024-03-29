import { createAction, props } from "@ngrx/store";
import { IProduct, ProductResourceTypes } from '@djonnyx/tornado-types';

export enum ProductActionTypes {
    GET_REQUEST = "TORNADO/product/get:request",
    GET_SUCCESS = "TORNADO/product/get:success",
    GET_ERROR = "TORNADO/product/get:error",

    CREATE_REQUEST = "TORNADO/product/create:request",
    CREATE_SUCCESS = "TORNADO/product/create:success",
    CREATE_ERROR = "TORNADO/product/create:error",

    UPDATE_REQUEST = "TORNADO/product/update:request",
    UPDATE_SUCCESS = "TORNADO/product/update:success",
    UPDATE_ERROR = "TORNADO/product/update:error",

    UPDATE_RESOURCE = "TORNADO/product/update-resources",

    UPDATE = "TORNADO/product/update",

    CLEAR = "TORNADO/product/clear",
}

export namespace ProductActions {
    // get
    export const getRequest = createAction(
        ProductActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        ProductActionTypes.GET_SUCCESS,
        props<{ product: IProduct }>(),
    );
    export const getError = createAction(
        ProductActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        ProductActionTypes.CREATE_REQUEST,
        props<{product: IProduct}>(),
    );
    export const createSuccess = createAction(
        ProductActionTypes.CREATE_SUCCESS,
        props<{ product: IProduct }>(),
    );
    export const createError = createAction(
        ProductActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        ProductActionTypes.UPDATE_REQUEST,
        props<{ id: string, product: IProduct }>(),
    );
    export const updateSuccess = createAction(
        ProductActionTypes.UPDATE_SUCCESS,
        props<{ product: IProduct }>(),
    );
    export const updateError = createAction(
        ProductActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // updateResource
    export const updateResource = createAction(
        ProductActionTypes.UPDATE_RESOURCE,
        props<{ langCode: string, resourcesType: ProductResourceTypes, assetId: string }>(),
    );

    // update state
    export const update = createAction(
        ProductActionTypes.UPDATE,
        props<{ product: IProduct }>(),
    );

    // clear
    export const clear = createAction(
        ProductActionTypes.CLEAR,
    );
}

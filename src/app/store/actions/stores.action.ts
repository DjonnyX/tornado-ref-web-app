import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IStore } from '@djonnyx/tornado-types';

export enum StoresActionTypes {
    GET_ALL_REQUEST = "TORNADO/stores/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/stores/get-all:success",
    GET_ALL_ERROR = "TORNADO/stores/get-all:error",

    GET_REQUEST = "TORNADO/stores/get:request",
    GET_SUCCESS = "TORNADO/stores/get:success",
    GET_ERROR = "TORNADO/stores/get:error",

    CREATE_REQUEST = "TORNADO/stores/create:request",
    CREATE_SUCCESS = "TORNADO/stores/create:success",
    CREATE_ERROR = "TORNADO/stores/create:error",

    UPDATE_REQUEST = "TORNADO/stores/update:request",
    UPDATE_SUCCESS = "TORNADO/stores/update:success",
    UPDATE_ERROR = "TORNADO/stores/update:error",

    DELETE_REQUEST = "TORNADO/stores/delete:request",
    DELETE_SUCCESS = "TORNADO/stores/delete:success",
    DELETE_ERROR = "TORNADO/stores/delete:error",
}

export namespace StoresActions {
    // getAll
    export const getAllRequest = createAction(
        StoresActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        StoresActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IStore>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        StoresActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        StoresActionTypes.GET_REQUEST,
        props<{ storeId: string }>()
    );
    export const getSuccess = createAction(
        StoresActionTypes.GET_SUCCESS,
        props<{ store: IStore, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        StoresActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        StoresActionTypes.CREATE_REQUEST,
        props<{ store: IStore }>(),
    );
    export const createSuccess = createAction(
        StoresActionTypes.CREATE_SUCCESS,
        props<{ store: IStore, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        StoresActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        StoresActionTypes.UPDATE_REQUEST,
        props<{ id: string, store: IStore }>(),
    );
    export const updateSuccess = createAction(
        StoresActionTypes.UPDATE_SUCCESS,
        props<{ store: IStore, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        StoresActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        StoresActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        StoresActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        StoresActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );
}

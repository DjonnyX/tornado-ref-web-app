import { createAction, props } from "@ngrx/store";
import { IStore } from '@djonnyx/tornado-types';

export enum StoreActionTypes {
    GET_REQUEST = "TORNADO/store/get:request",
    GET_SUCCESS = "TORNADO/store/get:success",
    GET_ERROR = "TORNADO/store/get:error",

    CREATE_REQUEST = "TORNADO/store/create:request",
    CREATE_SUCCESS = "TORNADO/store/create:success",
    CREATE_ERROR = "TORNADO/store/create:error",

    UPDATE_REQUEST = "TORNADO/store/update:request",
    UPDATE_SUCCESS = "TORNADO/store/update:success",
    UPDATE_ERROR = "TORNADO/store/update:error",

    CLEAR = "TORNADO/store/clear",
}

export namespace StoreActions {
    // get
    export const getRequest = createAction(
        StoreActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        StoreActionTypes.GET_SUCCESS,
        props<{ store: IStore }>(),
    );
    export const getError = createAction(
        StoreActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        StoreActionTypes.CREATE_REQUEST,
        props<{ store: IStore }>()
    );
    export const createSuccess = createAction(
        StoreActionTypes.CREATE_SUCCESS,
        props<{ store: IStore }>()
    );
    export const createError = createAction(
        StoreActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        StoreActionTypes.UPDATE_REQUEST,
        props<{ id: string, store: IStore }>()
    );
    export const updateSuccess = createAction(
        StoreActionTypes.UPDATE_SUCCESS,
        props<{ store: IStore }>()
    );
    export const updateError = createAction(
        StoreActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        StoreActionTypes.CLEAR,
    );
}

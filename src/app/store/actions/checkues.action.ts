import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ICheckue, IRequestOptions } from '@djonnyx/tornado-types';

export enum CheckuesActionTypes {
    GET_ALL_REQUEST = "TORNADO/checkues/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/checkues/get-all:success",
    GET_ALL_ERROR = "TORNADO/checkues/get-all:error",

    GET_REQUEST = "TORNADO/checkues/get:request",
    GET_SUCCESS = "TORNADO/checkues/get:success",
    GET_ERROR = "TORNADO/checkues/get:error",

    CREATE_REQUEST = "TORNADO/checkues/create:request",
    CREATE_SUCCESS = "TORNADO/checkues/create:success",
    CREATE_ERROR = "TORNADO/checkues/create:error",

    UPDATE_REQUEST = "TORNADO/checkues/update:request",
    UPDATE_SUCCESS = "TORNADO/checkues/update:success",
    UPDATE_ERROR = "TORNADO/checkues/update:error",

    DELETE_REQUEST = "TORNADO/checkues/delete:request",
    DELETE_SUCCESS = "TORNADO/checkues/delete:success",
    DELETE_ERROR = "TORNADO/checkues/delete:error",

    CLEAR = "TORNADO/checkues/clear",
}

export namespace CheckuesActions {
    // getAll
    export const getAllRequest = createAction(
        CheckuesActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        CheckuesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ICheckue>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        CheckuesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        CheckuesActionTypes.GET_REQUEST,
        props<{ checkueId: string }>()
    );
    export const getSuccess = createAction(
        CheckuesActionTypes.GET_SUCCESS,
        props<{ checkue: ICheckue, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        CheckuesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        CheckuesActionTypes.CREATE_REQUEST,
        props<{ checkue: ICheckue }>(),
    );
    export const createSuccess = createAction(
        CheckuesActionTypes.CREATE_SUCCESS,
        props<{ checkue: ICheckue, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        CheckuesActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        CheckuesActionTypes.UPDATE_REQUEST,
        props<{ id: string, checkue: ICheckue, setDafault?: boolean }>(),
    );
    export const updateSuccess = createAction(
        CheckuesActionTypes.UPDATE_SUCCESS,
        props<{ checkue: ICheckue, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        CheckuesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        CheckuesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        CheckuesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        CheckuesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        CheckuesActionTypes.CLEAR,
    );
}

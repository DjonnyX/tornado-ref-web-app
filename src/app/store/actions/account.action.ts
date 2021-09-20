import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse, IAccountCreateRequest, IUserSignupRequest } from '@services';
import { IAccount, IRequestOptions } from '@djonnyx/tornado-types';

export enum AccountActionTypes {
    GET_REQUEST = "TORNADO/account/get:request",
    GET_SUCCESS = "TORNADO/account/get:success",
    GET_ERROR = "TORNADO/account/get:error",

    CREATE_REQUEST = "TORNADO/account/create:request",
    CREATE_SUCCESS = "TORNADO/account/create:success",
    CREATE_ERROR = "TORNADO/account/create:error",

    UPDATE_REQUEST = "TORNADO/account/update:request",
    UPDATE_SUCCESS = "TORNADO/account/update:success",
    UPDATE_ERROR = "TORNADO/account/update:error",

    DELETE_REQUEST = "TORNADO/account/delete:request",
    DELETE_SUCCESS = "TORNADO/account/delete:success",
    DELETE_ERROR = "TORNADO/account/delete:error",

    CLEAR = "TORNADO/account/clear",
}

export namespace AccountActions {
    // get
    export const getRequest = createAction(
        AccountActionTypes.GET_REQUEST,
        props<{ id: string }>()
    );
    export const getSuccess = createAction(
        AccountActionTypes.GET_SUCCESS,
        props<{ account: IAccount, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        AccountActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        AccountActionTypes.CREATE_REQUEST,
        props<{ data: IAccountCreateRequest, options?: IRequestOptions }>(),
    );
    export const createSuccess = createAction(
        AccountActionTypes.CREATE_SUCCESS,
        props<{ account: IAccount }>(),
    );
    export const createError = createAction(
        AccountActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        AccountActionTypes.UPDATE_REQUEST,
        props<{ id: string, account: IAccount }>(),
    );
    export const updateSuccess = createAction(
        AccountActionTypes.UPDATE_SUCCESS,
        props<{ account: IAccount, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        AccountActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        AccountActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        AccountActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        AccountActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        AccountActionTypes.CLEAR,
    );
}

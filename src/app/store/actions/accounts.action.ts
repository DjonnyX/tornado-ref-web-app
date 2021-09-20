import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse, IUserSignupRequest } from '@services';
import { IAccount, IRequestOptions } from '@djonnyx/tornado-types';

export enum AccountsActionTypes {
    GET_ALL_REQUEST = "TORNADO/accounts/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/accounts/get-all:success",
    GET_ALL_ERROR = "TORNADO/accounts/get-all:error",

    CREATE_REQUEST = "TORNADO/accounts/create:request",
    CREATE_SUCCESS = "TORNADO/accounts/create:success",
    CREATE_ERROR = "TORNADO/accounts/create:error",

    GET_REQUEST = "TORNADO/accounts/get:request",
    GET_SUCCESS = "TORNADO/accounts/get:success",
    GET_ERROR = "TORNADO/accounts/get:error",

    UPDATE_REQUEST = "TORNADO/accounts/update:request",
    UPDATE_SUCCESS = "TORNADO/accounts/update:success",
    UPDATE_ERROR = "TORNADO/accounts/update:error",

    DELETE_REQUEST = "TORNADO/accounts/delete:request",
    DELETE_SUCCESS = "TORNADO/accounts/delete:success",
    DELETE_ERROR = "TORNADO/accounts/delete:error",

    CLEAR = "TORNADO/accounts/clear",
}

export namespace AccountsActions {
    // getAll
    export const getAllRequest = createAction(
        AccountsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        AccountsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAccount>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        AccountsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        AccountsActionTypes.GET_REQUEST,
        props<{ accountId: string }>()
    );
    export const getSuccess = createAction(
        AccountsActionTypes.GET_SUCCESS,
        props<{ account: IAccount, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        AccountsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        AccountsActionTypes.CREATE_REQUEST,
        props<{ data: IUserSignupRequest, options?: IRequestOptions }>(),
    );
    export const createSuccess = createAction(
        AccountsActionTypes.CREATE_SUCCESS,
        props<{ account: IAccount }>(),
    );
    export const createError = createAction(
        AccountsActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        AccountsActionTypes.UPDATE_REQUEST,
        props<{ id: string, account: IAccount }>(),
    );
    export const updateSuccess = createAction(
        AccountsActionTypes.UPDATE_SUCCESS,
        props<{ account: IAccount, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        AccountsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        AccountsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        AccountsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        AccountsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        AccountsActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAccount } from '@djonnyx/tornado-types';

export enum AccountsActionTypes {
    GET_ALL_REQUEST = "TORNADO/accounts/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/accounts/get-all:success",
    GET_ALL_ERROR = "TORNADO/accounts/get-all:error",

    GET_REQUEST = "TORNADO/accounts/get:request",
    GET_SUCCESS = "TORNADO/accounts/get:success",
    GET_ERROR = "TORNADO/accounts/get:error",

    UPDATE_REQUEST = "TORNADO/accounts/update:request",
    UPDATE_SUCCESS = "TORNADO/accounts/update:success",
    UPDATE_ERROR = "TORNADO/accounts/update:error",
}

export namespace AccountsActions {
    // getAll
    export const getAllRequest = createAction(
        AccountsActionTypes.GET_ALL_REQUEST,
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
}

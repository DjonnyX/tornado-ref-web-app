import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ICurrency, IRequestOptions } from '@djonnyx/tornado-types';

export enum CurrenciesActionTypes {
    GET_ALL_REQUEST = "TORNADO/currencies/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/currencies/get-all:success",
    GET_ALL_ERROR = "TORNADO/currencies/get-all:error",

    GET_REQUEST = "TORNADO/currencies/get:request",
    GET_SUCCESS = "TORNADO/currencies/get:success",
    GET_ERROR = "TORNADO/currencies/get:error",

    CREATE_REQUEST = "TORNADO/currencies/create:request",
    CREATE_SUCCESS = "TORNADO/currencies/create:success",
    CREATE_ERROR = "TORNADO/currencies/create:error",

    UPDATE_REQUEST = "TORNADO/currencies/update:request",
    UPDATE_SUCCESS = "TORNADO/currencies/update:success",
    UPDATE_ERROR = "TORNADO/currencies/update:error",

    DELETE_REQUEST = "TORNADO/currencies/delete:request",
    DELETE_SUCCESS = "TORNADO/currencies/delete:success",
    DELETE_ERROR = "TORNADO/currencies/delete:error",

    CLEAR = "TORNADO/currencies/clear",
}

export namespace CurrenciesActions {
    // getAll
    export const getAllRequest = createAction(
        CurrenciesActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        CurrenciesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ICurrency>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        CurrenciesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        CurrenciesActionTypes.GET_REQUEST,
        props<{ currencyId: string }>()
    );
    export const getSuccess = createAction(
        CurrenciesActionTypes.GET_SUCCESS,
        props<{ currency: ICurrency, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        CurrenciesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        CurrenciesActionTypes.CREATE_REQUEST,
        props<{ currency: ICurrency }>(),
    );
    export const createSuccess = createAction(
        CurrenciesActionTypes.CREATE_SUCCESS,
        props<{ currency: ICurrency, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        CurrenciesActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        CurrenciesActionTypes.UPDATE_REQUEST,
        props<{ id: string, currency: ICurrency, setDafault?: boolean }>(),
    );
    export const updateSuccess = createAction(
        CurrenciesActionTypes.UPDATE_SUCCESS,
        props<{ currency: ICurrency, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        CurrenciesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        CurrenciesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        CurrenciesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        CurrenciesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        CurrenciesActionTypes.CLEAR,
    );
}

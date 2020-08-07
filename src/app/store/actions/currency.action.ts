import { createAction, props } from "@ngrx/store";
import { ICurrency } from '@djonnyx/tornado-types';

export enum CurrencyActionTypes {
    GET_REQUEST = "TORNADO/currency/get:request",
    GET_SUCCESS = "TORNADO/currency/get:success",
    GET_ERROR = "TORNADO/currency/get:error",

    CREATE_REQUEST = "TORNADO/currency/create:request",
    CREATE_SUCCESS = "TORNADO/currency/create:success",
    CREATE_ERROR = "TORNADO/currency/create:error",

    UPDATE_REQUEST = "TORNADO/currency/update:request",
    UPDATE_SUCCESS = "TORNADO/currency/update:success",
    UPDATE_ERROR = "TORNADO/currency/update:error",

    CLEAR = "TORNADO/currency/clear",
}

export namespace CurrencyActions {
    // get
    export const getRequest = createAction(
        CurrencyActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        CurrencyActionTypes.GET_SUCCESS,
        props<{ currency: ICurrency }>(),
    );
    export const getError = createAction(
        CurrencyActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        CurrencyActionTypes.CREATE_REQUEST,
        props<{ currency: ICurrency }>()
    );
    export const createSuccess = createAction(
        CurrencyActionTypes.CREATE_SUCCESS,
        props<{ currency: ICurrency }>()
    );
    export const createError = createAction(
        CurrencyActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        CurrencyActionTypes.UPDATE_REQUEST,
        props<{ id: string, currency: ICurrency }>()
    );
    export const updateSuccess = createAction(
        CurrencyActionTypes.UPDATE_SUCCESS,
        props<{ currency: ICurrency }>()
    );
    export const updateError = createAction(
        CurrencyActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        CurrencyActionTypes.CLEAR,
    );
}

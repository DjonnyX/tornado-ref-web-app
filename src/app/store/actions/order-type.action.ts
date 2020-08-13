import { createAction, props } from "@ngrx/store";
import { IOrderType } from '@djonnyx/tornado-types';

export enum OrderTypeActionTypes {
    GET_REQUEST = "TORNADO/order-type/get:request",
    GET_SUCCESS = "TORNADO/order-type/get:success",
    GET_ERROR = "TORNADO/order-type/get:error",

    CREATE_REQUEST = "TORNADO/order-type/create:request",
    CREATE_SUCCESS = "TORNADO/order-type/create:success",
    CREATE_ERROR = "TORNADO/order-type/create:error",

    UPDATE_REQUEST = "TORNADO/order-type/update:request",
    UPDATE_SUCCESS = "TORNADO/order-type/update:success",
    UPDATE_ERROR = "TORNADO/order-type/update:error",

    CLEAR = "TORNADO/order-type/clear",
}

export namespace OrderTypeActions {
    // get
    export const getRequest = createAction(
        OrderTypeActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        OrderTypeActionTypes.GET_SUCCESS,
        props<{ orderType: IOrderType }>(),
    );
    export const getError = createAction(
        OrderTypeActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        OrderTypeActionTypes.CREATE_REQUEST,
        props<{ orderType: IOrderType }>()
    );
    export const createSuccess = createAction(
        OrderTypeActionTypes.CREATE_SUCCESS,
        props<{ orderType: IOrderType }>()
    );
    export const createError = createAction(
        OrderTypeActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        OrderTypeActionTypes.UPDATE_REQUEST,
        props<{ id: string, orderType: IOrderType }>()
    );
    export const updateSuccess = createAction(
        OrderTypeActionTypes.UPDATE_SUCCESS,
        props<{ orderType: IOrderType }>()
    );
    export const updateError = createAction(
        OrderTypeActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        OrderTypeActionTypes.CLEAR,
    );
}

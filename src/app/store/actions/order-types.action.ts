import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IOrderType, IRequestOptions } from '@djonnyx/tornado-types';

export enum OrderTypesActionTypes {
    GET_ALL_REQUEST = "TORNADO/order-types/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/order-types/get-all:success",
    GET_ALL_ERROR = "TORNADO/order-types/get-all:error",

    GET_REQUEST = "TORNADO/order-types/get:request",
    GET_SUCCESS = "TORNADO/order-types/get:success",
    GET_ERROR = "TORNADO/order-types/get:error",

    CREATE_REQUEST = "TORNADO/order-types/create:request",
    CREATE_SUCCESS = "TORNADO/order-types/create:success",
    CREATE_ERROR = "TORNADO/order-types/create:error",

    UPDATE_REQUEST = "TORNADO/order-types/update:request",
    UPDATE_SUCCESS = "TORNADO/order-types/update:success",
    UPDATE_ERROR = "TORNADO/order-types/update:error",

    DELETE_REQUEST = "TORNADO/order-types/delete:request",
    DELETE_SUCCESS = "TORNADO/order-types/delete:success",
    DELETE_ERROR = "TORNADO/order-types/delete:error",

    CLEAR = "TORNADO/order-types/clear",
}

export namespace OrderTypesActions {
    // getAll
    export const getAllRequest = createAction(
        OrderTypesActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        OrderTypesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IOrderType>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        OrderTypesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        OrderTypesActionTypes.GET_REQUEST,
        props<{ orderTypeId: string }>()
    );
    export const getSuccess = createAction(
        OrderTypesActionTypes.GET_SUCCESS,
        props<{ orderType: IOrderType, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        OrderTypesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        OrderTypesActionTypes.CREATE_REQUEST,
        props<{ orderType: IOrderType }>(),
    );
    export const createSuccess = createAction(
        OrderTypesActionTypes.CREATE_SUCCESS,
        props<{ orderType: IOrderType, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        OrderTypesActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        OrderTypesActionTypes.UPDATE_REQUEST,
        props<{ id: string, orderType: IOrderType }>(),
    );
    export const updateSuccess = createAction(
        OrderTypesActionTypes.UPDATE_SUCCESS,
        props<{ orderType: IOrderType, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        OrderTypesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        OrderTypesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        OrderTypesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        OrderTypesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        OrderTypesActionTypes.CLEAR,
    );
}

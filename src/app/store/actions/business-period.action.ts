import { createAction, props } from "@ngrx/store";
import { IBusinessPeriod } from '@djonnyx/tornado-types';

export enum BusinessPeriodActionTypes {
    GET_REQUEST = "TORNADO/business-period/get:request",
    GET_SUCCESS = "TORNADO/business-period/get:success",
    GET_ERROR = "TORNADO/business-period/get:error",

    CREATE_REQUEST = "TORNADO/business-period/create:request",
    CREATE_SUCCESS = "TORNADO/business-period/create:success",
    CREATE_ERROR = "TORNADO/business-period/create:error",

    UPDATE_REQUEST = "TORNADO/business-period/update:request",
    UPDATE_SUCCESS = "TORNADO/business-period/update:success",
    UPDATE_ERROR = "TORNADO/business-period/update:error",

    CLEAR = "TORNADO/business-period/clear",
}

export namespace BusinessPeriodActions {
    // get
    export const getRequest = createAction(
        BusinessPeriodActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        BusinessPeriodActionTypes.GET_SUCCESS,
        props<{ businessPeriod: IBusinessPeriod }>(),
    );
    export const getError = createAction(
        BusinessPeriodActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        BusinessPeriodActionTypes.CREATE_REQUEST,
        props<{ businessPeriod: IBusinessPeriod }>()
    );
    export const createSuccess = createAction(
        BusinessPeriodActionTypes.CREATE_SUCCESS,
        props<{ businessPeriod: IBusinessPeriod }>()
    );
    export const createError = createAction(
        BusinessPeriodActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        BusinessPeriodActionTypes.UPDATE_REQUEST,
        props<{ id: string, businessPeriod: IBusinessPeriod }>()
    );
    export const updateSuccess = createAction(
        BusinessPeriodActionTypes.UPDATE_SUCCESS,
        props<{ businessPeriod: IBusinessPeriod }>()
    );
    export const updateError = createAction(
        BusinessPeriodActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        BusinessPeriodActionTypes.CLEAR,
    );
}

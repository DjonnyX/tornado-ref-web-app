import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

export enum BusinessPeriodsActionTypes {
    GET_ALL_REQUEST = "TORNADO/business-periods/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/business-periods/get-all:success",
    GET_ALL_ERROR = "TORNADO/business-periods/get-all:error",

    GET_REQUEST = "TORNADO/business-periods/get:request",
    GET_SUCCESS = "TORNADO/business-periods/get:success",
    GET_ERROR = "TORNADO/business-periods/get:error",

    CREATE_REQUEST = "TORNADO/business-periods/create:request",
    CREATE_SUCCESS = "TORNADO/business-periods/create:success",
    CREATE_ERROR = "TORNADO/business-periods/create:error",

    UPDATE_REQUEST = "TORNADO/business-periods/update:request",
    UPDATE_SUCCESS = "TORNADO/business-periods/update:success",
    UPDATE_ERROR = "TORNADO/business-periods/update:error",

    DELETE_REQUEST = "TORNADO/business-periods/delete:request",
    DELETE_SUCCESS = "TORNADO/business-periods/delete:success",
    DELETE_ERROR = "TORNADO/business-periods/delete:error",
}

export namespace BusinessPeriodsActions {
    // getAll
    export const getAllRequest = createAction(
        BusinessPeriodsActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        BusinessPeriodsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IBusinessPeriod>, meta: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        BusinessPeriodsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        BusinessPeriodsActionTypes.GET_REQUEST,
        props<{ businessPeriodId: string }>(),
    );
    export const getSuccess = createAction(
        BusinessPeriodsActionTypes.GET_SUCCESS,
        props<{ businessPeriod: IBusinessPeriod, meta: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        BusinessPeriodsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        BusinessPeriodsActionTypes.CREATE_REQUEST,
        props<{businessPeriod: IBusinessPeriod}>(),
    );
    export const createSuccess = createAction(
        BusinessPeriodsActionTypes.CREATE_SUCCESS,
        props<{ businessPeriod: IBusinessPeriod, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        BusinessPeriodsActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        BusinessPeriodsActionTypes.UPDATE_REQUEST,
        props<{ id: string, businessPeriod: IBusinessPeriod }>(),
    );
    export const updateSuccess = createAction(
        BusinessPeriodsActionTypes.UPDATE_SUCCESS,
        props<{ businessPeriod: IBusinessPeriod, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        BusinessPeriodsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        BusinessPeriodsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        BusinessPeriodsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        BusinessPeriodsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );
}

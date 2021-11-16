import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IRequestOptions, IWeightUnit } from '@djonnyx/tornado-types';

export enum WeightUnitsActionTypes {
    GET_ALL_REQUEST = "TORNADO/weight-units/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/weight-units/get-all:success",
    GET_ALL_ERROR = "TORNADO/weight-units/get-all:error",

    GET_REQUEST = "TORNADO/weight-units/get:request",
    GET_SUCCESS = "TORNADO/weight-units/get:success",
    GET_ERROR = "TORNADO/weight-units/get:error",

    CREATE_REQUEST = "TORNADO/weight-units/create:request",
    CREATE_SUCCESS = "TORNADO/weight-units/create:success",
    CREATE_ERROR = "TORNADO/weight-units/create:error",

    UPDATE_REQUEST = "TORNADO/weight-units/update:request",
    UPDATE_SUCCESS = "TORNADO/weight-units/update:success",
    UPDATE_ERROR = "TORNADO/weight-units/update:error",

    DELETE_REQUEST = "TORNADO/weight-units/delete:request",
    DELETE_SUCCESS = "TORNADO/weight-units/delete:success",
    DELETE_ERROR = "TORNADO/weight-units/delete:error",

    CLEAR = "TORNADO/weight-units/clear",
}

export namespace WeightUnitsActions {
    // getAll
    export const getAllRequest = createAction(
        WeightUnitsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        WeightUnitsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IWeightUnit>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        WeightUnitsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        WeightUnitsActionTypes.GET_REQUEST,
        props<{ weightunitId: string }>()
    );
    export const getSuccess = createAction(
        WeightUnitsActionTypes.GET_SUCCESS,
        props<{ weightunit: IWeightUnit, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        WeightUnitsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        WeightUnitsActionTypes.CREATE_REQUEST,
        props<{ weightunit: IWeightUnit }>(),
    );
    export const createSuccess = createAction(
        WeightUnitsActionTypes.CREATE_SUCCESS,
        props<{ weightunit: IWeightUnit, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        WeightUnitsActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        WeightUnitsActionTypes.UPDATE_REQUEST,
        props<{ id: string, weightunit: IWeightUnit }>(),
    );
    export const updateSuccess = createAction(
        WeightUnitsActionTypes.UPDATE_SUCCESS,
        props<{ weightunit: IWeightUnit, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        WeightUnitsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        WeightUnitsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        WeightUnitsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        WeightUnitsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        WeightUnitsActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IWeightUnit } from '@djonnyx/tornado-types';

export enum WeightUnitActionTypes {
    GET_REQUEST = "TORNADO/weight-unit/get:request",
    GET_SUCCESS = "TORNADO/weight-unit/get:success",
    GET_ERROR = "TORNADO/weight-unit/get:error",

    CREATE_REQUEST = "TORNADO/weight-unit/create:request",
    CREATE_SUCCESS = "TORNADO/weight-unit/create:success",
    CREATE_ERROR = "TORNADO/weight-unit/create:error",

    UPDATE_REQUEST = "TORNADO/weight-unit/update:request",
    UPDATE_SUCCESS = "TORNADO/weight-unit/update:success",
    UPDATE_ERROR = "TORNADO/weight-unit/update:error",

    CLEAR = "TORNADO/weight-unit/clear",
}

export namespace WeightUnitActions {
    // get
    export const getRequest = createAction(
        WeightUnitActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        WeightUnitActionTypes.GET_SUCCESS,
        props<{ weightunit: IWeightUnit }>(),
    );
    export const getError = createAction(
        WeightUnitActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        WeightUnitActionTypes.CREATE_REQUEST,
        props<{ weightunit: IWeightUnit }>()
    );
    export const createSuccess = createAction(
        WeightUnitActionTypes.CREATE_SUCCESS,
        props<{ weightunit: IWeightUnit }>()
    );
    export const createError = createAction(
        WeightUnitActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        WeightUnitActionTypes.UPDATE_REQUEST,
        props<{ id: string, weightunit: IWeightUnit }>()
    );
    export const updateSuccess = createAction(
        WeightUnitActionTypes.UPDATE_SUCCESS,
        props<{ weightunit: IWeightUnit }>()
    );
    export const updateError = createAction(
        WeightUnitActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        WeightUnitActionTypes.CLEAR,
    );
}

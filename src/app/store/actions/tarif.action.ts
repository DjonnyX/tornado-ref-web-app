import { createAction, props } from "@ngrx/store";
import { ITarif } from '@djonnyx/tornado-types';

export enum TarifActionTypes {
    GET_REQUEST = "TORNADO/tarif/get:request",
    GET_SUCCESS = "TORNADO/tarif/get:success",
    GET_ERROR = "TORNADO/tarif/get:error",

    CREATE_REQUEST = "TORNADO/tarif/create:request",
    CREATE_SUCCESS = "TORNADO/tarif/create:success",
    CREATE_ERROR = "TORNADO/tarif/create:error",

    UPDATE_REQUEST = "TORNADO/tarif/update:request",
    UPDATE_SUCCESS = "TORNADO/tarif/update:success",
    UPDATE_ERROR = "TORNADO/tarif/update:error",

    CLEAR = "TORNADO/tarif/clear",
}

export namespace TarifActions {
    // get
    export const getRequest = createAction(
        TarifActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        TarifActionTypes.GET_SUCCESS,
        props<{ tarif: ITarif }>(),
    );
    export const getError = createAction(
        TarifActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        TarifActionTypes.CREATE_REQUEST,
        props<{ tarif: ITarif }>()
    );
    export const createSuccess = createAction(
        TarifActionTypes.CREATE_SUCCESS,
        props<{ tarif: ITarif }>()
    );
    export const createError = createAction(
        TarifActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        TarifActionTypes.UPDATE_REQUEST,
        props<{ id: string, tarif: ITarif }>()
    );
    export const updateSuccess = createAction(
        TarifActionTypes.UPDATE_SUCCESS,
        props<{ tarif: ITarif }>()
    );
    export const updateError = createAction(
        TarifActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        TarifActionTypes.CLEAR,
    );
}

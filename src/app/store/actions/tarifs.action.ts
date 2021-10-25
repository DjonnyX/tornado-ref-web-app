import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ITarif, IRequestOptions } from '@djonnyx/tornado-types';

export enum TarifsActionTypes {
    GET_ALL_REQUEST = "TORNADO/tarifs/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/tarifs/get-all:success",
    GET_ALL_ERROR = "TORNADO/tarifs/get-all:error",

    GET_REQUEST = "TORNADO/tarifs/get:request",
    GET_SUCCESS = "TORNADO/tarifs/get:success",
    GET_ERROR = "TORNADO/tarifs/get:error",

    CREATE_REQUEST = "TORNADO/tarifs/create:request",
    CREATE_SUCCESS = "TORNADO/tarifs/create:success",
    CREATE_ERROR = "TORNADO/tarifs/create:error",

    UPDATE_REQUEST = "TORNADO/tarifs/update:request",
    UPDATE_SUCCESS = "TORNADO/tarifs/update:success",
    UPDATE_ERROR = "TORNADO/tarifs/update:error",

    DELETE_REQUEST = "TORNADO/tarifs/delete:request",
    DELETE_SUCCESS = "TORNADO/tarifs/delete:success",
    DELETE_ERROR = "TORNADO/tarifs/delete:error",

    CLEAR = "TORNADO/tarifs/clear",
}

export namespace TarifsActions {
    // getAll
    export const getAllRequest = createAction(
        TarifsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        TarifsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ITarif>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        TarifsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        TarifsActionTypes.GET_REQUEST,
        props<{ tarifId: string }>()
    );
    export const getSuccess = createAction(
        TarifsActionTypes.GET_SUCCESS,
        props<{ tarif: ITarif, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        TarifsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        TarifsActionTypes.UPDATE_REQUEST,
        props<{ id: string, tarif: ITarif }>(),
    );
    export const updateSuccess = createAction(
        TarifsActionTypes.UPDATE_SUCCESS,
        props<{ tarif: ITarif, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        TarifsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        TarifsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        TarifsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        TarifsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        TarifsActionTypes.CLEAR,
    );
}

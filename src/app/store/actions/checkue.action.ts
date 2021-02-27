import { createAction, props } from "@ngrx/store";
import { ICheckue } from '@djonnyx/tornado-types';

export enum CheckueActionTypes {
    GET_REQUEST = "TORNADO/checkue/get:request",
    GET_SUCCESS = "TORNADO/checkue/get:success",
    GET_ERROR = "TORNADO/checkue/get:error",

    CREATE_REQUEST = "TORNADO/checkue/create:request",
    CREATE_SUCCESS = "TORNADO/checkue/create:success",
    CREATE_ERROR = "TORNADO/checkue/create:error",

    UPDATE_REQUEST = "TORNADO/checkue/update:request",
    UPDATE_SUCCESS = "TORNADO/checkue/update:success",
    UPDATE_ERROR = "TORNADO/checkue/update:error",

    CLEAR = "TORNADO/checkue/clear",
}

export namespace CheckueActions {
    // get
    export const getRequest = createAction(
        CheckueActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        CheckueActionTypes.GET_SUCCESS,
        props<{ checkue: ICheckue }>(),
    );
    export const getError = createAction(
        CheckueActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        CheckueActionTypes.CREATE_REQUEST,
        props<{ checkue: ICheckue }>()
    );
    export const createSuccess = createAction(
        CheckueActionTypes.CREATE_SUCCESS,
        props<{ checkue: ICheckue }>()
    );
    export const createError = createAction(
        CheckueActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        CheckueActionTypes.UPDATE_REQUEST,
        props<{ id: string, checkue: ICheckue }>()
    );
    export const updateSuccess = createAction(
        CheckueActionTypes.UPDATE_SUCCESS,
        props<{ checkue: ICheckue }>()
    );
    export const updateError = createAction(
        CheckueActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        CheckueActionTypes.CLEAR,
    );
}

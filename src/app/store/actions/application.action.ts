import { createAction, props } from "@ngrx/store";
import { IApplication } from '@djonnyx/tornado-types';

export enum ApplicationActionTypes {
    GET_REQUEST = "TORNADO/application/get:request",
    GET_SUCCESS = "TORNADO/application/get:success",
    GET_ERROR = "TORNADO/application/get:error",

    CREATE_REQUEST = "TORNADO/application/create:request",
    CREATE_SUCCESS = "TORNADO/application/create:success",
    CREATE_ERROR = "TORNADO/application/create:error",

    UPDATE_REQUEST = "TORNADO/application/update:request",
    UPDATE_SUCCESS = "TORNADO/application/update:success",
    UPDATE_ERROR = "TORNADO/application/update:error",

    CLEAR = "TORNADO/application/clear",
}

export namespace ApplicationActions {
    // get
    export const getRequest = createAction(
        ApplicationActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        ApplicationActionTypes.GET_SUCCESS,
        props<{ application: IApplication }>(),
    );
    export const getError = createAction(
        ApplicationActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        ApplicationActionTypes.CREATE_REQUEST,
        props<{ application: IApplication }>()
    );
    export const createSuccess = createAction(
        ApplicationActionTypes.CREATE_SUCCESS,
        props<{ application: IApplication }>()
    );
    export const createError = createAction(
        ApplicationActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        ApplicationActionTypes.UPDATE_REQUEST,
        props<{ id: string, application: IApplication }>()
    );
    export const updateSuccess = createAction(
        ApplicationActionTypes.UPDATE_SUCCESS,
        props<{ application: IApplication }>()
    );
    export const updateError = createAction(
        ApplicationActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        ApplicationActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IApplication } from '@djonnyx/tornado-types';

export enum ApplicationActionTypes {
    GET_REQUEST = "TORNADO/license-type/get:request",
    GET_SUCCESS = "TORNADO/license-type/get:success",
    GET_ERROR = "TORNADO/license-type/get:error",

    CREATE_REQUEST = "TORNADO/license-type/create:request",
    CREATE_SUCCESS = "TORNADO/license-type/create:success",
    CREATE_ERROR = "TORNADO/license-type/create:error",

    UPDATE_REQUEST = "TORNADO/license-type/update:request",
    UPDATE_SUCCESS = "TORNADO/license-type/update:success",
    UPDATE_ERROR = "TORNADO/license-type/update:error",

    CLEAR = "TORNADO/license-type/clear",
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

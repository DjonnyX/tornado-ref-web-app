import { createAction, props } from "@ngrx/store";
import { ISystemTag } from '@djonnyx/tornado-types';

export enum SystemTagActionTypes {
    GET_REQUEST = "TORNADO/system-systemTag/get:request",
    GET_SUCCESS = "TORNADO/system-systemTag/get:success",
    GET_ERROR = "TORNADO/system-systemTag/get:error",

    CREATE_REQUEST = "TORNADO/system-systemTag/create:request",
    CREATE_SUCCESS = "TORNADO/system-systemTag/create:success",
    CREATE_ERROR = "TORNADO/system-systemTag/create:error",

    UPDATE_REQUEST = "TORNADO/system-systemTag/update:request",
    UPDATE_SUCCESS = "TORNADO/system-systemTag/update:success",
    UPDATE_ERROR = "TORNADO/system-systemTag/update:error",

    CLEAR = "TORNADO/system-systemTag/clear",
}

export namespace SystemTagActions {
    // get
    export const getRequest = createAction(
        SystemTagActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        SystemTagActionTypes.GET_SUCCESS,
        props<{ systemTag: ISystemTag }>(),
    );
    export const getError = createAction(
        SystemTagActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        SystemTagActionTypes.CREATE_REQUEST,
        props<{ systemTag: ISystemTag }>()
    );
    export const createSuccess = createAction(
        SystemTagActionTypes.CREATE_SUCCESS,
        props<{ systemTag: ISystemTag }>()
    );
    export const createError = createAction(
        SystemTagActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        SystemTagActionTypes.UPDATE_REQUEST,
        props<{ id: string, systemTag: ISystemTag }>()
    );
    export const updateSuccess = createAction(
        SystemTagActionTypes.UPDATE_SUCCESS,
        props<{ systemTag: ISystemTag }>()
    );
    export const updateError = createAction(
        SystemTagActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        SystemTagActionTypes.CLEAR,
    );
}

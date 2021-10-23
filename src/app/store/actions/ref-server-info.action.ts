import { createAction, props } from "@ngrx/store";
import { IRefServerInfo } from '@djonnyx/tornado-types';

export enum RefServerInfoActionTypes {
    GET_REQUEST = "TORNADO/ref-server-info/get:request",
    GET_SUCCESS = "TORNADO/ref-server-info/get:success",
    GET_ERROR = "TORNADO/ref-server-info/get:error",

    CLEAR = "TORNADO/ref-server-info/clear",
}

export namespace RefServerInfoActions {
    // get
    export const getRequest = createAction(
        RefServerInfoActionTypes.GET_REQUEST,
    );
    export const getSuccess = createAction(
        RefServerInfoActionTypes.GET_SUCCESS,
        props<{ info: IRefServerInfo }>(),
    );
    export const getError = createAction(
        RefServerInfoActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        RefServerInfoActionTypes.CLEAR,
    );
}

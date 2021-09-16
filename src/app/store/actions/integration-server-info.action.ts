import { createAction, props } from "@ngrx/store";
import { IIntegration, IIntegrationServerInfo } from '@djonnyx/tornado-types';

export enum IntegrationServerInfoActionTypes {
    GET_REQUEST = "TORNADO/integration-server-info/get:request",
    GET_SUCCESS = "TORNADO/integration-server-info/get:success",
    GET_ERROR = "TORNADO/integration-server-info/get:error",

    CLEAR = "TORNADO/integration-server-info/clear",
}

export namespace IntegrationServerInfoActions {
    // get
    export const getRequest = createAction(
        IntegrationServerInfoActionTypes.GET_REQUEST,
        props<{ host: string }>(),
    );
    export const getSuccess = createAction(
        IntegrationServerInfoActionTypes.GET_SUCCESS,
        props<{ info: IIntegrationServerInfo }>(),
    );
    export const getError = createAction(
        IntegrationServerInfoActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        IntegrationServerInfoActionTypes.CLEAR,
    );
}

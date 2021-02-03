import { createAction, props } from "@ngrx/store";
import { IIntegration } from '@djonnyx/tornado-types';

export enum IntegrationActionTypes {
    GET_REQUEST = "TORNADO/integration/get:request",
    GET_SUCCESS = "TORNADO/integration/get:success",
    GET_ERROR = "TORNADO/integration/get:error",

    UPDATE_REQUEST = "TORNADO/integration/update:request",
    UPDATE_SUCCESS = "TORNADO/integration/update:success",
    UPDATE_ERROR = "TORNADO/integration/update:error",

    CLEAR = "TORNADO/integration/clear",
}

export namespace IntegrationActions {
    // get
    export const getRequest = createAction(
        IntegrationActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        IntegrationActionTypes.GET_SUCCESS,
        props<{ integration: IIntegration }>(),
    );
    export const getError = createAction(
        IntegrationActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        IntegrationActionTypes.UPDATE_REQUEST,
        props<{ id: string, integration: IIntegration }>()
    );
    export const updateSuccess = createAction(
        IntegrationActionTypes.UPDATE_SUCCESS,
        props<{ integration: IIntegration }>()
    );
    export const updateError = createAction(
        IntegrationActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        IntegrationActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IIntegration, IRequestOptions } from '@djonnyx/tornado-types';

export enum IntegrationsActionTypes {
    GET_ALL_REQUEST = "TORNADO/integrations/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/integrations/get-all:success",
    GET_ALL_ERROR = "TORNADO/integrations/get-all:error",

    GET_REQUEST = "TORNADO/integrations/get:request",
    GET_SUCCESS = "TORNADO/integrations/get:success",
    GET_ERROR = "TORNADO/integrations/get:error",

    UPDATE_REQUEST = "TORNADO/integrations/update:request",
    UPDATE_SUCCESS = "TORNADO/integrations/update:success",
    UPDATE_ERROR = "TORNADO/integrations/update:error",

    CLEAR = "TORNADO/integrations/clear",
}

export namespace IntegrationsActions {
    // getAll
    export const getAllRequest = createAction(
        IntegrationsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        IntegrationsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IIntegration>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        IntegrationsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        IntegrationsActionTypes.GET_REQUEST,
        props<{ integrationId: string }>()
    );
    export const getSuccess = createAction(
        IntegrationsActionTypes.GET_SUCCESS,
        props<{ integration: IIntegration, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        IntegrationsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        IntegrationsActionTypes.UPDATE_REQUEST,
        props<{ id: string, integration: IIntegration }>(),
    );
    export const updateSuccess = createAction(
        IntegrationsActionTypes.UPDATE_SUCCESS,
        props<{ integration: IIntegration, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        IntegrationsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        IntegrationsActionTypes.CLEAR,
    );
}

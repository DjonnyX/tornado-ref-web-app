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

    CREATE_REQUEST = "TORNADO/integrations/create:request",
    CREATE_SUCCESS = "TORNADO/integrations/create:success",
    CREATE_ERROR = "TORNADO/integrations/create:error",

    UPDATE_REQUEST = "TORNADO/integrations/update:request",
    UPDATE_SUCCESS = "TORNADO/integrations/update:success",
    UPDATE_ERROR = "TORNADO/integrations/update:error",

    DELETE_REQUEST = "TORNADO/integrations/delete:request",
    DELETE_SUCCESS = "TORNADO/integrations/delete:success",
    DELETE_ERROR = "TORNADO/integrations/delete:error",

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

    // create
    export const createRequest = createAction(
        IntegrationsActionTypes.CREATE_REQUEST,
        props<{ integration: IIntegration }>(),
    );
    export const createSuccess = createAction(
        IntegrationsActionTypes.CREATE_SUCCESS,
        props<{ integration: IIntegration, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        IntegrationsActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        IntegrationsActionTypes.UPDATE_REQUEST,
        props<{ id: string, integration: IIntegration, setDafault?: boolean }>(),
    );
    export const updateSuccess = createAction(
        IntegrationsActionTypes.UPDATE_SUCCESS,
        props<{ integration: IIntegration, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        IntegrationsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        IntegrationsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        IntegrationsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        IntegrationsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        IntegrationsActionTypes.CLEAR,
    );
}

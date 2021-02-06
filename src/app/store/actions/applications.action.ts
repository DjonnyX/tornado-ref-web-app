import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IApplication, IRequestOptions } from '@djonnyx/tornado-types';

export enum ApplicationsActionTypes {
    GET_ALL_REQUEST = "TORNADO/applications/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/applications/get-all:success",
    GET_ALL_ERROR = "TORNADO/applications/get-all:error",

    GET_REQUEST = "TORNADO/applications/get:request",
    GET_SUCCESS = "TORNADO/applications/get:success",
    GET_ERROR = "TORNADO/applications/get:error",

    CREATE_REQUEST = "TORNADO/applications/create:request",
    CREATE_SUCCESS = "TORNADO/applications/create:success",
    CREATE_ERROR = "TORNADO/applications/create:error",

    UPDATE_REQUEST = "TORNADO/applications/update:request",
    UPDATE_SUCCESS = "TORNADO/applications/update:success",
    UPDATE_ERROR = "TORNADO/applications/update:error",

    DELETE_REQUEST = "TORNADO/applications/delete:request",
    DELETE_SUCCESS = "TORNADO/applications/delete:success",
    DELETE_ERROR = "TORNADO/applications/delete:error",

    CLEAR = "TORNADO/applications/clear",
}

export namespace ApplicationsActions {
    // getAll
    export const getAllRequest = createAction(
        ApplicationsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        ApplicationsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IApplication>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        ApplicationsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        ApplicationsActionTypes.GET_REQUEST,
        props<{ applicationId: string }>()
    );
    export const getSuccess = createAction(
        ApplicationsActionTypes.GET_SUCCESS,
        props<{ application: IApplication, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        ApplicationsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        ApplicationsActionTypes.UPDATE_REQUEST,
        props<{ id: string, application: IApplication }>(),
    );
    export const updateSuccess = createAction(
        ApplicationsActionTypes.UPDATE_SUCCESS,
        props<{ application: IApplication, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        ApplicationsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        ApplicationsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        ApplicationsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        ApplicationsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        ApplicationsActionTypes.CLEAR,
    );
}

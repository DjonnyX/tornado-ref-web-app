import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse, IUserSignupRequest } from '@services';
import { IRole, IRequestOptions } from '@djonnyx/tornado-types';

export enum RolesActionTypes {
    GET_ALL_REQUEST = "TORNADO/roles/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/roles/get-all:success",
    GET_ALL_ERROR = "TORNADO/roles/get-all:error",

    CREATE_REQUEST = "TORNADO/roles/create:request",
    CREATE_SUCCESS = "TORNADO/roles/create:success",
    CREATE_ERROR = "TORNADO/roles/create:error",

    GET_REQUEST = "TORNADO/roles/get:request",
    GET_SUCCESS = "TORNADO/roles/get:success",
    GET_ERROR = "TORNADO/roles/get:error",

    UPDATE_REQUEST = "TORNADO/roles/update:request",
    UPDATE_SUCCESS = "TORNADO/roles/update:success",
    UPDATE_ERROR = "TORNADO/roles/update:error",

    DELETE_REQUEST = "TORNADO/roles/delete:request",
    DELETE_SUCCESS = "TORNADO/roles/delete:success",
    DELETE_ERROR = "TORNADO/roles/delete:error",

    CLEAR = "TORNADO/roles/clear",
}

export namespace RolesActions {
    // getAll
    export const getAllRequest = createAction(
        RolesActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        RolesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IRole>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        RolesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        RolesActionTypes.GET_REQUEST,
        props<{ id: string }>()
    );
    export const getSuccess = createAction(
        RolesActionTypes.GET_SUCCESS,
        props<{ role: IRole, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        RolesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        RolesActionTypes.CREATE_REQUEST,
        props<{ data: IUserSignupRequest, options?: IRequestOptions }>(),
    );
    export const createSuccess = createAction(
        RolesActionTypes.CREATE_SUCCESS,
        props<{ role: IRole }>(),
    );
    export const createError = createAction(
        RolesActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        RolesActionTypes.UPDATE_REQUEST,
        props<{ id: string, role: IRole }>(),
    );
    export const updateSuccess = createAction(
        RolesActionTypes.UPDATE_SUCCESS,
        props<{ role: IRole, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        RolesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        RolesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        RolesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        RolesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        RolesActionTypes.CLEAR,
    );
}

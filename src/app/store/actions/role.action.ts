import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IRole, IRequestOptions } from '@djonnyx/tornado-types';

export enum RoleActionTypes {
    GET_REQUEST = "TORNADO/role/get:request",
    GET_SUCCESS = "TORNADO/role/get:success",
    GET_ERROR = "TORNADO/role/get:error",

    CREATE_REQUEST = "TORNADO/role/create:request",
    CREATE_SUCCESS = "TORNADO/role/create:success",
    CREATE_ERROR = "TORNADO/role/create:error",

    UPDATE_REQUEST = "TORNADO/role/update:request",
    UPDATE_SUCCESS = "TORNADO/role/update:success",
    UPDATE_ERROR = "TORNADO/role/update:error",

    DELETE_REQUEST = "TORNADO/role/delete:request",
    DELETE_SUCCESS = "TORNADO/role/delete:success",
    DELETE_ERROR = "TORNADO/role/delete:error",

    CLEAR = "TORNADO/role/clear",
}

export namespace RoleActions {
    // get
    export const getRequest = createAction(
        RoleActionTypes.GET_REQUEST,
        props<{ id: string }>()
    );
    export const getSuccess = createAction(
        RoleActionTypes.GET_SUCCESS,
        props<{ role: IRole, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        RoleActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        RoleActionTypes.CREATE_REQUEST,
        props<{ data: IRole, options?: IRequestOptions }>(),
    );
    export const createSuccess = createAction(
        RoleActionTypes.CREATE_SUCCESS,
        props<{ role: IRole, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        RoleActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        RoleActionTypes.UPDATE_REQUEST,
        props<{ id: string, role: IRole }>(),
    );
    export const updateSuccess = createAction(
        RoleActionTypes.UPDATE_SUCCESS,
        props<{ role: IRole, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        RoleActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        RoleActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        RoleActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        RoleActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        RoleActionTypes.CLEAR,
    );
}

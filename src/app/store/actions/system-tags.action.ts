import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IRequestOptions, ISystemTag } from '@djonnyx/tornado-types';

export enum SystemTagsActionTypes {
    GET_ALL_REQUEST = "TORNADO/system-systemTags/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/system-systemTags/get-all:success",
    GET_ALL_ERROR = "TORNADO/system-systemTags/get-all:error",

    GET_REQUEST = "TORNADO/system-systemTags/get:request",
    GET_SUCCESS = "TORNADO/system-systemTags/get:success",
    GET_ERROR = "TORNADO/system-systemTags/get:error",

    CREATE_REQUEST = "TORNADO/system-systemTags/create:request",
    CREATE_SUCCESS = "TORNADO/system-systemTags/create:success",
    CREATE_ERROR = "TORNADO/system-systemTags/create:error",

    UPDATE_REQUEST = "TORNADO/system-systemTags/update:request",
    UPDATE_SUCCESS = "TORNADO/system-systemTags/update:success",
    UPDATE_ERROR = "TORNADO/system-systemTags/update:error",

    DELETE_REQUEST = "TORNADO/system-systemTags/delete:request",
    DELETE_SUCCESS = "TORNADO/system-systemTags/delete:success",
    DELETE_ERROR = "TORNADO/system-systemTags/delete:error",

    CLEAR = "TORNADO/system-systemTags/clear",
}

export namespace SystemTagsActions {
    // getAll
    export const getAllRequest = createAction(
        SystemTagsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        SystemTagsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ISystemTag>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        SystemTagsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        SystemTagsActionTypes.GET_REQUEST,
        props<{ systemTagId: string }>()
    );
    export const getSuccess = createAction(
        SystemTagsActionTypes.GET_SUCCESS,
        props<{ systemTag: ISystemTag, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        SystemTagsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        SystemTagsActionTypes.CREATE_REQUEST,
        props<{ systemTag: ISystemTag }>(),
    );
    export const createSuccess = createAction(
        SystemTagsActionTypes.CREATE_SUCCESS,
        props<{ systemTag: ISystemTag, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        SystemTagsActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        SystemTagsActionTypes.UPDATE_REQUEST,
        props<{ id: string, systemTag: ISystemTag }>(),
    );
    export const updateSuccess = createAction(
        SystemTagsActionTypes.UPDATE_SUCCESS,
        props<{ systemTag: ISystemTag, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        SystemTagsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        SystemTagsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        SystemTagsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        SystemTagsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        SystemTagsActionTypes.CLEAR,
    );
}

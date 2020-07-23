import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ITag } from '@djonnyx/tornado-types';

export enum TagsActionTypes {
    GET_ALL_REQUEST = "TORNADO/tags/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/tags/get-all:success",
    GET_ALL_ERROR = "TORNADO/tags/get-all:error",

    GET_REQUEST = "TORNADO/tags/get:request",
    GET_SUCCESS = "TORNADO/tags/get:success",
    GET_ERROR = "TORNADO/tags/get:error",

    CREATE_REQUEST = "TORNADO/tags/create:request",
    CREATE_SUCCESS = "TORNADO/tags/create:success",
    CREATE_ERROR = "TORNADO/tags/create:error",

    UPDATE_REQUEST = "TORNADO/tags/update:request",
    UPDATE_SUCCESS = "TORNADO/tags/update:success",
    UPDATE_ERROR = "TORNADO/tags/update:error",

    DELETE_REQUEST = "TORNADO/tags/delete:request",
    DELETE_SUCCESS = "TORNADO/tags/delete:success",
    DELETE_ERROR = "TORNADO/tags/delete:error",
}

export namespace TagsActions {
    // getAll
    export const getAllRequest = createAction(
        TagsActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        TagsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ITag>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        TagsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        TagsActionTypes.GET_REQUEST,
        props<{ tagId: string }>()
    );
    export const getSuccess = createAction(
        TagsActionTypes.GET_SUCCESS,
        props<{ tag: ITag, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        TagsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        TagsActionTypes.CREATE_REQUEST,
        props<{ tag: ITag }>(),
    );
    export const createSuccess = createAction(
        TagsActionTypes.CREATE_SUCCESS,
        props<{ tag: ITag, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        TagsActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        TagsActionTypes.UPDATE_REQUEST,
        props<{ id: string, tag: ITag }>(),
    );
    export const updateSuccess = createAction(
        TagsActionTypes.UPDATE_SUCCESS,
        props<{ tag: ITag, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        TagsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        TagsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        TagsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        TagsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );
}

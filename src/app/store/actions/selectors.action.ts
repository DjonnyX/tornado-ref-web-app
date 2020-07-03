import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ISelector } from '@app/models/selector.model';

export enum SelectorsActionTypes {
    GET_ALL_REQUEST = "TORNADO/selectors/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/selectors/get-all:success",
    GET_ALL_ERROR = "TORNADO/selectors/get-all:error",

    GET_REQUEST = "TORNADO/selectors/get:request",
    GET_SUCCESS = "TORNADO/selectors/get:success",
    GET_ERROR = "TORNADO/selectors/get:error",

    CREATE_REQUEST = "TORNADO/selectors/create:request",
    CREATE_SUCCESS = "TORNADO/selectors/create:success",
    CREATE_ERROR = "TORNADO/selectors/create:error",

    UPDATE_REQUEST = "TORNADO/selectors/update:request",
    UPDATE_SUCCESS = "TORNADO/selectors/update:success",
    UPDATE_ERROR = "TORNADO/selectors/update:error",

    DELETE_REQUEST = "TORNADO/selectors/delete:request",
    DELETE_SUCCESS = "TORNADO/selectors/delete:success",
    DELETE_ERROR = "TORNADO/selectors/delete:error",

    NEW = "TORNADO/selectors/new",

    EDIT = "TORNADO/selectors/edit",
}

export namespace SelectorsActions {
    // getAll
    export const getAllRequest = createAction(
        SelectorsActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        SelectorsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ISelector>, meta: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        SelectorsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        SelectorsActionTypes.GET_REQUEST,
        props<{ selectorId: string }>()
    );
    export const getSuccess = createAction(
        SelectorsActionTypes.GET_SUCCESS,
        props<{ selector: ISelector, meta: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        SelectorsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        SelectorsActionTypes.CREATE_REQUEST,
        props<ISelector>()
    );
    export const createSuccess = createAction(
        SelectorsActionTypes.CREATE_SUCCESS,
        props<{ selector: ISelector, meta: IMetaRefsResponse }>()
    );
    export const createError = createAction(
        SelectorsActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        SelectorsActionTypes.UPDATE_REQUEST,
        props<{ id: string, selector: ISelector }>()
    );
    export const updateSuccess = createAction(
        SelectorsActionTypes.UPDATE_SUCCESS,
        props<{ selector: ISelector, meta: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        SelectorsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        SelectorsActionTypes.DELETE_REQUEST,
        props<{ id: string }>()
    );
    export const deleteSuccess = createAction(
        SelectorsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        SelectorsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );

    export const setNewSelector = createAction(
        SelectorsActionTypes.NEW,
        props<{ selector: ISelector }>()
    );

    export const setEditSelector = createAction(
        SelectorsActionTypes.EDIT,
        props<{ selector: ISelector }>()
    );
}

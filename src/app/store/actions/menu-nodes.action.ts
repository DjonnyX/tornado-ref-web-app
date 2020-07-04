import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { INode } from '@models';

export enum MenuNodesActionTypes {
    GET_ALL_REQUEST = "TORNADO/menu-nodes/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/menu-nodes/get-all:success",
    GET_ALL_ERROR = "TORNADO/menu-nodes/get-all:error",

    GET_REQUEST = "TORNADO/menu-nodes/get:request",
    GET_SUCCESS = "TORNADO/menu-nodes/get:success",
    GET_ERROR = "TORNADO/menu-nodes/get:error",

    CREATE_REQUEST = "TORNADO/menu-nodes/create:request",
    CREATE_SUCCESS = "TORNADO/menu-nodes/create:success",
    CREATE_ERROR = "TORNADO/menu-nodes/create:error",

    UPDATE_REQUEST = "TORNADO/menu-nodes/update:request",
    UPDATE_SUCCESS = "TORNADO/menu-nodes/update:success",
    UPDATE_ERROR = "TORNADO/menu-nodes/update:error",

    DELETE_REQUEST = "TORNADO/menu-nodes/delete:request",
    DELETE_SUCCESS = "TORNADO/menu-nodes/delete:success",
    DELETE_ERROR = "TORNADO/menu-nodes/delete:error",
}

export namespace MenuNodesActions {
    // getAll
    export const getAllRequest = createAction(
        MenuNodesActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        MenuNodesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<INode>, meta: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        MenuNodesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        MenuNodesActionTypes.GET_REQUEST,
        props<{ nodeId: string }>()
    );
    export const getSuccess = createAction(
        MenuNodesActionTypes.GET_SUCCESS,
        props<{ node: INode, meta: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        MenuNodesActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        MenuNodesActionTypes.CREATE_REQUEST,
        props<{node: INode}>()
    );
    export const createSuccess = createAction(
        MenuNodesActionTypes.CREATE_SUCCESS,
        props<{ parent: INode, child: INode, meta: IMetaRefsResponse }>()
    );
    export const createError = createAction(
        MenuNodesActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        MenuNodesActionTypes.UPDATE_REQUEST,
        props<{ id: string, node: INode }>()
    );
    export const updateSuccess = createAction(
        MenuNodesActionTypes.UPDATE_SUCCESS,
        props<{ node: INode, meta: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        MenuNodesActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        MenuNodesActionTypes.DELETE_REQUEST,
        props<{ id: string }>()
    );
    export const deleteSuccess = createAction(
        MenuNodesActionTypes.DELETE_SUCCESS,
        props<{ ids: Array<string>, meta: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        MenuNodesActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );
}

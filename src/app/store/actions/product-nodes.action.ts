import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { INode } from '@djonnyx/tornado-types';

export enum ProductNodesActionTypes {
    GET_ALL_REQUEST = "TORNADO/product-nodes/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/product-nodes/get-all:success",
    GET_ALL_ERROR = "TORNADO/product-nodes/get-all:error",

    GET_REQUEST = "TORNADO/product-nodes/get:request",
    GET_SUCCESS = "TORNADO/product-nodes/get:success",
    GET_ERROR = "TORNADO/product-nodes/get:error",

    CREATE_REQUEST = "TORNADO/product-nodes/create:request",
    CREATE_SUCCESS = "TORNADO/product-nodes/create:success",
    CREATE_ERROR = "TORNADO/product-nodes/create:error",

    UPDATE_REQUEST = "TORNADO/product-nodes/update:request",
    UPDATE_SUCCESS = "TORNADO/product-nodes/update:success",
    UPDATE_ERROR = "TORNADO/product-nodes/update:error",

    DELETE_REQUEST = "TORNADO/product-nodes/delete:request",
    DELETE_SUCCESS = "TORNADO/product-nodes/delete:success",
    DELETE_ERROR = "TORNADO/product-nodes/delete:error",
}

export namespace ProductNodesActions {
    // getAll
    export const getAllRequest = createAction(
        ProductNodesActionTypes.GET_ALL_REQUEST,
        props<{id: string}>()
    );
    export const getAllSuccess = createAction(
        ProductNodesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<INode>, meta: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        ProductNodesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        ProductNodesActionTypes.GET_REQUEST,
        props<{ nodeId: string }>()
    );
    export const getSuccess = createAction(
        ProductNodesActionTypes.GET_SUCCESS,
        props<{ node: INode, meta: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        ProductNodesActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        ProductNodesActionTypes.CREATE_REQUEST,
        props<{node: INode}>()
    );
    export const createSuccess = createAction(
        ProductNodesActionTypes.CREATE_SUCCESS,
        props<{ changed: INode, created: INode, meta: IMetaRefsResponse }>()
    );
    export const createError = createAction(
        ProductNodesActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        ProductNodesActionTypes.UPDATE_REQUEST,
        props<{ id: string, node: INode }>()
    );
    export const updateSuccess = createAction(
        ProductNodesActionTypes.UPDATE_SUCCESS,
        props<{ node: INode, meta: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        ProductNodesActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        ProductNodesActionTypes.DELETE_REQUEST,
        props<{ id: string }>()
    );
    export const deleteSuccess = createAction(
        ProductNodesActionTypes.DELETE_SUCCESS,
        props<{ changed: INode, deleted: Array<string>, meta: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        ProductNodesActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );
}

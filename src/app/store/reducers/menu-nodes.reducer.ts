import { createReducer, on } from '@ngrx/store';
import { IMenuNodesState } from '@store/state';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { INode } from '@models';

export const initialState: IMenuNodesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const menuNodesReducer = createReducer(
    initialState,
    on(MenuNodesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(MenuNodesActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(MenuNodesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(MenuNodesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(MenuNodesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.createSuccess, (state, { node, meta }) => {
        return {
            ...state,
            collection: [...state.collection, node],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.updateSuccess, (state, { node, meta }) => {
        const existsNodeIndex = state.collection.findIndex(p => p.id === node.id);
        let collection = [...state.collection];
        if (existsNodeIndex > -1) {
            collection.splice(existsNodeIndex, 1);
            collection.splice(existsNodeIndex, 0, node);
        }
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.deleteSuccess, (state, { id, meta }) => {
        const existsNodeIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<INode> = [...state.collection];
        if (existsNodeIndex > -1) {
            collection.splice(existsNodeIndex, 1);
        }
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isDeleteProcess: false,
            loading: false,
        };
    }),
);

export default menuNodesReducer;

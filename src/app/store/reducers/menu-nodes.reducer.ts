import { createReducer, on } from '@ngrx/store';
import { IMenuNodesState } from '@store/state';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { updateCollection, updateCollectionMulti, deleteNodesByIds } from '@app/utils/node-collection';

export const initialState: IMenuNodesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    isGetRootNodeProcess: false,
    error: undefined,
    collection: undefined,
    rootNodeId: undefined,
};

const menuNodesReducer = createReducer(
    initialState,
    on(MenuNodesActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(MenuNodesActions.getRootNodeIdRequest, state => {
        return {
            ...state,
            isGetRootNodeProcess: true,
            loading: true,
        };
    }),
    on(MenuNodesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(MenuNodesActions.createRequest, MenuNodesActions.createMultiRequest, state => {
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
    on(MenuNodesActions.getRootNodeIdError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetRootNodeProcess: false,
            loading: false,
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
    on(MenuNodesActions.createError, MenuNodesActions.createMultiError, (state, { error }) => {
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
    on(MenuNodesActions.getRootNodeIdSuccess, (state, { rootNodeId }) => {
        return {
            ...state,
            rootNodeId,
            error: undefined,
            isGetRootNodeProcess: false,
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
    on(MenuNodesActions.createSuccess, (state, { changed, created, meta }) => {
        const collection = updateCollection(state.collection, changed);
        collection.push(created);

        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.createMultiSuccess, (state, { changed, created, meta }) => {
        const collection = updateCollectionMulti(state.collection, changed);
        created.forEach(node => {
            collection.push(node);
        });

        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.updateSuccess, (state, { node, meta }) => {
        const collection = updateCollection(state.collection, node);
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(MenuNodesActions.deleteSuccess, (state, { changed, deleted, meta }) => {
        const collectionPass1 = deleteNodesByIds(state.collection, deleted);
        const collectionPass2 = updateCollection(collectionPass1, changed);
        return {
            ...state,
            collection: collectionPass2,
            meta,
            error: undefined,
            isDeleteProcess: false,
            loading: false,
        };
    }),
);

export default menuNodesReducer;

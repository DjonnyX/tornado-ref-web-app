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
    isGetRootNodeProcess: false,
    error: undefined,
    collection: undefined,
    rootNodeId: undefined,
};

const updateCollection = (collection: Array<INode>, node: INode): Array<INode> => {
    const result = [...collection];
    const existsNodeIndex = result.findIndex(p => p.id === node.id);
    if (existsNodeIndex > -1) {
        result.splice(existsNodeIndex, 1);
        result.splice(existsNodeIndex, 0, node);
    }

    return result;
}

/**
 * Удаляет ноды заданные id из коллекции и возвращает новую коллекцию
 */
const deleteNodesByIds = (collection: Array<INode>, ids: Array<string>): Array<INode> => {
    const result = [...collection];

    ids.forEach(id => {
        const existsNodeIndex = collection.findIndex(p => p.id === id);
        if (existsNodeIndex > -1) {
            result.splice(existsNodeIndex, 1);
        }
    });

    return result;
}

const menuNodesReducer = createReducer(
    initialState,
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
    on(MenuNodesActions.createSuccess, (state, { parent, child, meta }) => {
        const collection = updateCollection(state.collection, parent);
        collection.push(child);

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
    on(MenuNodesActions.deleteSuccess, (state, { ids, meta }) => {
        const collection = deleteNodesByIds(state.collection, ids);
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

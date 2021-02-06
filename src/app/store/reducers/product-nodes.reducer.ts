import { createReducer, on } from '@ngrx/store';
import { IProductNodesState } from '@store/state';
import { ProductNodesActions } from '@store/actions/product-nodes.action';
import { updateCollection, deleteNodesByIds } from '@app/utils/node-collection';

export const initialState: IProductNodesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    isGetRootNodeProcess: false,
    error: undefined,
    collection: undefined,
};

const productNodesReducer = createReducer(
    initialState,
    on(ProductNodesActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(ProductNodesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(ProductNodesActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(ProductNodesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(ProductNodesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(ProductNodesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductNodesActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ProductNodesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(ProductNodesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(ProductNodesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductNodesActions.createSuccess, (state, { changed, created, meta }) => {
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
    on(ProductNodesActions.updateSuccess, (state, { node, meta }) => {
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
    on(ProductNodesActions.deleteSuccess, (state, { changed, deleted, meta }) => {
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

export default productNodesReducer;

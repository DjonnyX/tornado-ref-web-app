import { createReducer, on } from '@ngrx/store';
import { IStore } from '@djonnyx/tornado-types';
import { StoresActions } from '@store/actions/stores.action';
import { IStoresState } from '@store/state/stores.state';

export const initialState: IStoresState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const storesReducer = createReducer(
    initialState,
    on(StoresActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(StoresActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(StoresActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(StoresActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(StoresActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(StoresActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(StoresActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(StoresActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(StoresActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(StoresActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(StoresActions.createSuccess, (state, { store, meta }) => {
        return {
            ...state,
            collection: [...state.collection, store],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(StoresActions.updateSuccess, (state, { store, meta }) => {
        const existsStoreIndex = state.collection.findIndex(p => p.id === store.id);
        let collection = [...state.collection];
        if (existsStoreIndex > -1) {
            collection.splice(existsStoreIndex, 1);
            collection.splice(existsStoreIndex, 0, store);
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
    on(StoresActions.deleteSuccess, (state, { id, meta }) => {
        const existsStoreIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IStore> = [...state.collection];
        if (existsStoreIndex > -1) {
            collection.splice(existsStoreIndex, 1);
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

export default storesReducer;

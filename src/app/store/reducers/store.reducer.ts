import { createReducer, on } from '@ngrx/store';
import { StoreActions } from '@store/actions/store.action';
import { IStoreState } from '@store/state/store.state';

export const initialState: IStoreState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    store: undefined,
};

const storeReducer = createReducer(
    initialState,
    on(StoreActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(StoreActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(StoreActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(StoreActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(StoreActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(StoreActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(StoreActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(StoreActions.getSuccess, (state, { store }) => {
        return {
            ...state,
            store,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(StoreActions.createSuccess, (state, { store }) => {
        return {
            ...state,
            store,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(StoreActions.updateSuccess, (state, { store }) => {
        return {
            ...state,
            store,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default storeReducer;

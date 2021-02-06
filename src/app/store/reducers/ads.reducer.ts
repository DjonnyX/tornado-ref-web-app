import { createReducer, on } from '@ngrx/store';
import { IAdsState } from '@store/state';
import { AdsActions } from '@store/actions/ads.action';
import { IAd } from '@djonnyx/tornado-types';

export const initialState: IAdsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const adsReducer = createReducer(
    initialState,
    on(AdsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(AdsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AdsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(AdsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AdsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(AdsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AdsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AdsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AdsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(AdsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AdsActions.createSuccess, (state, { ad, meta }) => {
        return {
            ...state,
            collection: [...state.collection, ad],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AdsActions.updateSuccess, (state, { ad, meta }) => {
        const existsAdIndex = state.collection.findIndex(p => p.id === ad.id);
        let collection = [...state.collection];
        if (existsAdIndex > -1) {
            collection.splice(existsAdIndex, 1);
            collection.splice(existsAdIndex, 0, ad);
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
    on(AdsActions.deleteSuccess, (state, { id, meta }) => {
        const existsAdIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IAd> = [...state.collection];
        if (existsAdIndex > -1) {
            collection.splice(existsAdIndex, 1);
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

export default adsReducer;

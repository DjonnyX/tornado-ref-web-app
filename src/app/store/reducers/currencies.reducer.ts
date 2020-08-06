import { createReducer, on } from '@ngrx/store';
import { ICurrency } from '@djonnyx/tornado-types';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { ICurrenciesState } from '@store/state/currencies.state';

export const initialState: ICurrenciesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const currenciesReducer = createReducer(
    initialState,
    on(CurrenciesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(CurrenciesActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(CurrenciesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(CurrenciesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(CurrenciesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CurrenciesActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CurrenciesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(CurrenciesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(CurrenciesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CurrenciesActions.createSuccess, (state, { currency, meta }) => {
        return {
            ...state,
            collection: [...state.collection, currency],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CurrenciesActions.updateSuccess, (state, { currency, meta }) => {
        const existsCurrencyIndex = state.collection.findIndex(p => p.id === currency.id);
        let collection = [...state.collection];
        if (existsCurrencyIndex > -1) {
            collection.splice(existsCurrencyIndex, 1);
            collection.splice(existsCurrencyIndex, 0, currency);
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
    on(CurrenciesActions.deleteSuccess, (state, { id, meta }) => {
        const existsCurrencyIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ICurrency> = [...state.collection];
        if (existsCurrencyIndex > -1) {
            collection.splice(existsCurrencyIndex, 1);
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

export default currenciesReducer;

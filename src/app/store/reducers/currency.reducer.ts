import { createReducer, on } from '@ngrx/store';
import { CurrencyActions } from '@store/actions/currency.action';
import { ICurrencyState } from '@store/state/currency.state';

export const initialState: ICurrencyState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    currency: undefined,
};

const currencyReducer = createReducer(
    initialState,
    on(CurrencyActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(CurrencyActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(CurrencyActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(CurrencyActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(CurrencyActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CurrencyActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CurrencyActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(CurrencyActions.getSuccess, (state, { currency }) => {
        return {
            ...state,
            currency,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CurrencyActions.createSuccess, (state, { currency }) => {
        return {
            ...state,
            currency,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CurrencyActions.updateSuccess, (state, { currency }) => {
        return {
            ...state,
            currency,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default currencyReducer;

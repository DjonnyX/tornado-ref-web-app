import { createReducer, on } from '@ngrx/store';
import { IAccount } from '@djonnyx/tornado-types';
import { AccountsActions } from '@store/actions/accounts.action';
import { IAccountsState } from '@store/state/accounts.state';

export const initialState: IAccountsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    error: undefined,
    collection: undefined,
};

const accountsReducer = createReducer(
    initialState,
    on(AccountsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AccountsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AccountsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AccountsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AccountsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AccountsActions.updateSuccess, (state, { account, meta }) => {
        const existsAccountIndex = state.collection.findIndex(p => p.id === account.id);
        let collection = [...state.collection];
        if (existsAccountIndex > -1) {
            collection.splice(existsAccountIndex, 1);
            collection.splice(existsAccountIndex, 0, account);
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
);

export default accountsReducer;

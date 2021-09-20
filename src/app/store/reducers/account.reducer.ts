import { createReducer, on } from '@ngrx/store';
import { IAccountState } from '@store/state';
import { AccountActions } from '@store/actions/account.action';

export const initialState: IAccountState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    account: undefined,
};

const accountReducer = createReducer(
    initialState,
    on(AccountActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(AccountActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AccountActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(AccountActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AccountActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AccountActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AccountActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AccountActions.getSuccess, (state, { account }) => {
        return {
            ...state,
            account,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AccountActions.createSuccess, (state, { account }) => {
        return {
            ...state,
            account,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AccountActions.updateSuccess, (state, { account }) => {
        return {
            ...state,
            account,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default accountReducer;

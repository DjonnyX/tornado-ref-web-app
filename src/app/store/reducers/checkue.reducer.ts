import { createReducer, on } from '@ngrx/store';
import { CheckueActions } from '@store/actions/checkue.action';
import { ICheckueState } from '@store/state/checkue.state';

export const initialState: ICheckueState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    checkue: undefined,
};

const checkueReducer = createReducer(
    initialState,
    on(CheckueActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(CheckueActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(CheckueActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(CheckueActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(CheckueActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CheckueActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CheckueActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(CheckueActions.getSuccess, (state, { checkue }) => {
        return {
            ...state,
            checkue,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CheckueActions.createSuccess, (state, { checkue }) => {
        return {
            ...state,
            checkue,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CheckueActions.updateSuccess, (state, { checkue }) => {
        return {
            ...state,
            checkue,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default checkueReducer;

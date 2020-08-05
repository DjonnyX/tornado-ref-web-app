import { createReducer, on } from '@ngrx/store';
import { SelectorActions } from '@store/actions/selector.action';
import { ISelectorState } from '@store/state/selector.state';

export const initialState: ISelectorState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    selector: undefined,
};

const selectorReducer = createReducer(
    initialState,
    on(SelectorActions.update, (state, { selector }) => {
        return {
            ...initialState,
            selector,
        };
    }),
    on(SelectorActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(SelectorActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(SelectorActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(SelectorActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(SelectorActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SelectorActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SelectorActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SelectorActions.getSuccess, (state, { selector }) => {
        return {
            ...state,
            selector,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SelectorActions.createSuccess, (state, { selector }) => {
        return {
            ...state,
            selector,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SelectorActions.updateSuccess, (state, { selector }) => {
        return {
            ...state,
            selector,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default selectorReducer;

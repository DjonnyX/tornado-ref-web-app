import { createReducer, on } from '@ngrx/store';
import { ApplicationActions } from '@store/actions/application.action';
import { IApplicationState } from '@store/state/application.state';

export const initialState: IApplicationState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    application: undefined,
};

const applicationReducer = createReducer(
    initialState,
    on(ApplicationActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(ApplicationActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(ApplicationActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(ApplicationActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(ApplicationActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ApplicationActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ApplicationActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(ApplicationActions.getSuccess, (state, { application }) => {
        return {
            ...state,
            application,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ApplicationActions.createSuccess, (state, { application }) => {
        return {
            ...state,
            application,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ApplicationActions.updateSuccess, (state, { application }) => {
        return {
            ...state,
            application,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default applicationReducer;

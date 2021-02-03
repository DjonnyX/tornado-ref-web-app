import { createReducer, on } from '@ngrx/store';
import { IntegrationActions } from '@store/actions/integration.action';
import { IIntegrationState } from '@store/state/integration.state';

export const initialState: IIntegrationState = {
    loading: false,
    isGetProcess: false,
    // isCreateProcess: false,
    isUpdateProcess: false,
    // isDeleteProcess: false,
    error: undefined,
    integration: undefined,
};

const integrationReducer = createReducer(
    initialState,
    on(IntegrationActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(IntegrationActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    /*on(IntegrationActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),*/
    on(IntegrationActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(IntegrationActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(IntegrationActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),*/
    on(IntegrationActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(IntegrationActions.getSuccess, (state, { integration }) => {
        return {
            ...state,
            integration,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(IntegrationActions.createSuccess, (state, { integration }) => {
        return {
            ...state,
            integration,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),*/
    on(IntegrationActions.updateSuccess, (state, { integration }) => {
        return {
            ...state,
            integration,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default integrationReducer;

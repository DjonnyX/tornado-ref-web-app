import { createReducer, on } from '@ngrx/store';
import { IIntegration } from '@djonnyx/tornado-types';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { IIntegrationsState } from '@store/state/integrations.state';

export const initialState: IIntegrationsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const integrationsReducer = createReducer(
    initialState,
    on(IntegrationsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(IntegrationsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(IntegrationsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(IntegrationsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(IntegrationsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(IntegrationsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(IntegrationsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(IntegrationsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(IntegrationsActions.updateSuccess, (state, { integration, meta }) => {
        const existsIntegrationIndex = state.collection.findIndex(p => p.id === integration.id);
        let collection = [...state.collection];
        if (existsIntegrationIndex > -1) {
            collection.splice(existsIntegrationIndex, 1);
            collection.splice(existsIntegrationIndex, 0, integration);
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
    on(IntegrationsActions.deleteSuccess, (state, { id, meta }) => {
        const existsIntegrationIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IIntegration> = [...state.collection];
        if (existsIntegrationIndex > -1) {
            collection.splice(existsIntegrationIndex, 1);
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

export default integrationsReducer;

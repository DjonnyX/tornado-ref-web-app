import { createReducer, on } from '@ngrx/store';
import { IntegrationServerInfoActions } from '@store/actions/integration-server-info.action';
import { IIntegrationServerInfoState } from '@store/state';

export const initialState: IIntegrationServerInfoState = {
    loading: false,
    isGetProcess: false,
    error: undefined,
    info: undefined,
};

const integrationServerInfoReducer = createReducer(
    initialState,
    on(IntegrationServerInfoActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(IntegrationServerInfoActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(IntegrationServerInfoActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(IntegrationServerInfoActions.getSuccess, (state, { info }) => {
        return {
            ...state,
            info,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
);

export default integrationServerInfoReducer;

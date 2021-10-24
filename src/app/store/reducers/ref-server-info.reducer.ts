import { createReducer, on } from '@ngrx/store';
import { RefServerInfoActions } from '@store/actions/ref-server-info.action';
import { IRefServerInfoState } from '@store/state';

export const initialState: IRefServerInfoState = {
    loading: false,
    isGetProcess: false,
    error: undefined,
    info: undefined,
};

const refServerInfoReducer = createReducer(
    initialState,
    on(RefServerInfoActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(RefServerInfoActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(RefServerInfoActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(RefServerInfoActions.getSuccess, (state, { info }) => {
        return {
            ...state,
            info,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
);

export default refServerInfoReducer;

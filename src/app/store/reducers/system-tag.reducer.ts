import { createReducer, on } from '@ngrx/store';
import { SystemTagActions } from '@store/actions/system-tag.action';
import { ISystemTagState } from '@store/state/system-tag.state';

export const initialState: ISystemTagState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    systemTag: undefined,
};

const systemTagReducer = createReducer(
    initialState,
    on(SystemTagActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(SystemTagActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(SystemTagActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(SystemTagActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(SystemTagActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SystemTagActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SystemTagActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SystemTagActions.getSuccess, (state, { systemTag }) => {
        return {
            ...state,
            systemTag,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SystemTagActions.createSuccess, (state, { systemTag }) => {
        return {
            ...state,
            systemTag,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SystemTagActions.updateSuccess, (state, { systemTag }) => {
        return {
            ...state,
            systemTag,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default systemTagReducer;

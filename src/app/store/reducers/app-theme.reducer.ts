import { createReducer, on } from '@ngrx/store';
import { AppThemeActions } from '@store/actions/app-theme.action';
import { IAppThemeState } from '@store/state/app-theme.state';
import { deepMergeObjects } from '@app/utils/object.util';

export const initialState: IAppThemeState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    theme: undefined,
};

const appThemeReducer = createReducer(
    initialState,
    on(AppThemeActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(AppThemeActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AppThemeActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(AppThemeActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AppThemeActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AppThemeActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AppThemeActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AppThemeActions.getSuccess, (state, { theme }) => {
        return {
            ...state,
            theme,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AppThemeActions.createSuccess, (state, { theme }) => {
        return {
            ...state,
            theme,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AppThemeActions.updateSuccess, (state, { theme }) => {
        return {
            ...state,
            theme,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default appThemeReducer;

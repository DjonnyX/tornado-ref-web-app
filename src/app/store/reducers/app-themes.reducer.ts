import { createReducer, on } from '@ngrx/store';
import { IAppThemesState } from '@store/state';
import { AppThemesActions } from '@store/actions/app-themes.action';
import { IAppTheme } from '@djonnyx/tornado-types';

export const initialState: IAppThemesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const appThemesReducer = createReducer(
    initialState,
    on(AppThemesActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(AppThemesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AppThemesActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(AppThemesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AppThemesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(AppThemesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AppThemesActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AppThemesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AppThemesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(AppThemesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AppThemesActions.createSuccess, (state, { theme, meta }) => {
        const newCollection = [...state.collection];
        newCollection.push(theme);
        return {
            ...state,
            collection: newCollection,
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AppThemesActions.updateSuccess, (state, { theme, meta }) => {
        const existsAppThemeIndex = state.collection?.findIndex(p => p.id === theme.id);
        let collection = [...state.collection];
        if (existsAppThemeIndex > -1) {
            collection.splice(existsAppThemeIndex, 1);
            collection.splice(existsAppThemeIndex, 0, theme);
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
    on(AppThemesActions.deleteSuccess, (state, { id, meta }) => {
        const existsAppThemeIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IAppTheme> = [...state.collection];
        if (existsAppThemeIndex > -1) {
            collection.splice(existsAppThemeIndex, 1);
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

export default appThemesReducer;

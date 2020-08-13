import { createReducer, on } from '@ngrx/store';
import { ILanguage } from '@djonnyx/tornado-types';
import { LanguagesActions } from '@store/actions/languages.action';
import { ILanguagesState } from '@store/state/languages.state';

export const initialState: ILanguagesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const languagesReducer = createReducer(
    initialState,
    on(LanguagesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(LanguagesActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(LanguagesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(LanguagesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(LanguagesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LanguagesActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LanguagesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(LanguagesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(LanguagesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LanguagesActions.createSuccess, (state, { language, meta }) => {
        return {
            ...state,
            collection: [...state.collection, language],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LanguagesActions.updateSuccess, (state, { language, meta }) => {
        const existsLanguageIndex = state.collection.findIndex(p => p.id === language.id);
        let collection = [...state.collection];
        if (existsLanguageIndex > -1) {
            collection.splice(existsLanguageIndex, 1);
            collection.splice(existsLanguageIndex, 0, language);
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
    on(LanguagesActions.deleteSuccess, (state, { id, meta }) => {
        const existsLanguageIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ILanguage> = [...state.collection];
        if (existsLanguageIndex > -1) {
            collection.splice(existsLanguageIndex, 1);
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

export default languagesReducer;

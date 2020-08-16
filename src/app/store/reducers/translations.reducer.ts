import { createReducer, on } from '@ngrx/store';
import { TranslationsActions } from '@store/actions/translations.action';
import { ITranslationsState } from '@store/state/translations.state';

export const initialState: ITranslationsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    error: undefined,
    collection: undefined,
};

const translationsReducer = createReducer(
    initialState,
    on(TranslationsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TranslationsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TranslationsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TranslationsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TranslationsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TranslationsActions.updateSuccess, (state, { translation, meta }) => {
        const existsTranslationIndex = state.collection.findIndex(p => p.id === translation.id);
        let collection = [...state.collection];
        if (existsTranslationIndex > -1) {
            collection.splice(existsTranslationIndex, 1);
            collection.splice(existsTranslationIndex, 0, translation);
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
);

export default translationsReducer;

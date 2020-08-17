import { createReducer, on } from '@ngrx/store';
import { TranslationActions } from '@store/actions/translation.action';
import { ITranslationState } from '@store/state/translation.state';

export const initialState: ITranslationState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    translation: undefined,
};

const translationReducer = createReducer(
    initialState,
    on(TranslationActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(TranslationActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TranslationActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TranslationActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TranslationActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TranslationActions.getSuccess, (state, { translation }) => {
        return {
            ...state,
            translation,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TranslationActions.updateSuccess, (state, { translation }) => {
        return {
            ...state,
            translation,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default translationReducer;

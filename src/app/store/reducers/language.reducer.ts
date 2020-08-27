import { createReducer, on } from '@ngrx/store';
import { LanguageActions } from '@store/actions/language.action';
import { ILanguageState } from '@store/state/language.state';
import { deepMergeObjects } from '@app/utils/object.util';

export const initialState: ILanguageState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    language: undefined,
};

const languageReducer = createReducer(
    initialState,
    on(LanguageActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(LanguageActions.updateImage, (state, { langCode, imageType, assetId }) => {
        const product = deepMergeObjects(state.language, {
            contents: {
                [langCode]: {
                    images: {
                        [imageType]: assetId,
                    },
                },
            },
        });
        return {
            ...initialState,
            product,
        };
    }),
    on(LanguageActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(LanguageActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(LanguageActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(LanguageActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LanguageActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LanguageActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(LanguageActions.getSuccess, (state, { language }) => {
        return {
            ...state,
            language,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LanguageActions.createSuccess, (state, { language }) => {
        return {
            ...state,
            language,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LanguageActions.updateSuccess, (state, { language }) => {
        return {
            ...state,
            language,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default languageReducer;

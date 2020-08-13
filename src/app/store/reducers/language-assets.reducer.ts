import { createReducer, on } from '@ngrx/store';
import { ILanguageAssetsState } from '@store/state';
import { LanguageAssetsActions } from '@store/actions/language-assets.action';
import { IAsset } from '@models';

export const initialState: ILanguageAssetsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const languageAssetsReducer = createReducer(
    initialState,
    on(LanguageAssetsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(LanguageAssetsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(LanguageAssetsActions.createRequest, LanguageAssetsActions.uploadImageRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(LanguageAssetsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(LanguageAssetsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(LanguageAssetsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LanguageAssetsActions.createError, LanguageAssetsActions.uploadImageError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LanguageAssetsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(LanguageAssetsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(LanguageAssetsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LanguageAssetsActions.createSuccess, LanguageAssetsActions.uploadImageSuccess, (state, { asset, tmpAsset, meta }) => {
        const existsTmpAssetIndex = state.collection.findIndex(p => p.id === tmpAsset.id);
        let collection = [...state.collection, asset];
        if (existsTmpAssetIndex > -1) {
            collection.splice(existsTmpAssetIndex, 1);
        }
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LanguageAssetsActions.createProgress, LanguageAssetsActions.uploadImageProgress, (state, { tmpAsset, progress }) => {
        const existsAssetIndex = state.collection.findIndex(p => p.id === tmpAsset.id);
        let collection = [...state.collection];
        const asset = { ...tmpAsset };
        asset.progress = progress;
        if (existsAssetIndex > -1) {
            collection.splice(existsAssetIndex, 1);
            collection.splice(existsAssetIndex, 0, asset);
        } else {
            collection.push(asset);
        }
        return {
            ...state,
            collection,
        };
    }),
    on(LanguageAssetsActions.updateSuccess, (state, { asset, meta }) => {
        const existsAssetIndex = state.collection.findIndex(p => p.id === asset.id);
        let collection = [...state.collection];
        if (existsAssetIndex > -1) {
            collection.splice(existsAssetIndex, 1);
            collection.splice(existsAssetIndex, 0, asset);
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

export default languageAssetsReducer;

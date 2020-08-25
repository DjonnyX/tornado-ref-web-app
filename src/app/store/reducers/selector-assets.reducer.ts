import { createReducer, on } from '@ngrx/store';
import { ISelectorAssetsState } from '@store/state';
import { SelectorAssetsActions } from '@store/actions/selector-assets.action';
import { IAsset } from '@models';

export const initialState: ISelectorAssetsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const selectorAssetsReducer = createReducer(
    initialState,
    on(SelectorAssetsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(SelectorAssetsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(SelectorAssetsActions.createRequest, SelectorAssetsActions.uploadImageRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(SelectorAssetsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(SelectorAssetsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(SelectorAssetsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SelectorAssetsActions.createError, SelectorAssetsActions.uploadImageError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SelectorAssetsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SelectorAssetsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(SelectorAssetsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SelectorAssetsActions.createSuccess, SelectorAssetsActions.uploadImageSuccess, (state, { asset, langCode, tmpAsset, meta }) => {
        const c = state.collection[langCode] || [];
        const existsTmpAssetIndex = c.findIndex(p => p.id === tmpAsset.id);
        let collection = [...c, asset];
        if (existsTmpAssetIndex > -1) {
            collection.splice(existsTmpAssetIndex, 1);
        }
        return {
            ...state,
            collection: {...state.collection, ...{[langCode]: collection}},
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SelectorAssetsActions.createProgress, SelectorAssetsActions.uploadImageProgress, (state, { tmpAsset, langCode, progress }) => {
        const c = state.collection[langCode] || [];
        const existsAssetIndex = c.findIndex(p => p.id === tmpAsset.id);
        let collection = [...c];
        const asset = {...tmpAsset};
        asset.progress = progress;
        if (existsAssetIndex > -1) {
            collection.splice(existsAssetIndex, 1);
            collection.splice(existsAssetIndex, 0, asset);
        } else {
            collection.push(asset);
        }
        return {
            ...state,
            collection: {...state.collection, ...{[langCode]: collection}},
        };
    }),
    on(SelectorAssetsActions.updateSuccess, (state, { asset, langCode, meta }) => {
        const c = state.collection[langCode] || [];
        const existsAssetIndex = c.findIndex(p => p.id === asset.id);
        let collection = [...c];
        if (existsAssetIndex > -1) {
            collection.splice(existsAssetIndex, 1);
            collection.splice(existsAssetIndex, 0, asset);
        }
        return {
            ...state,
            collection: {...state.collection, ...{[langCode]: collection}},
            meta,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SelectorAssetsActions.deleteSuccess, (state, { id, langCode, meta }) => {
        const c = state.collection[langCode] || [];
        const existsAssetIndex = c.findIndex(p => p.id === id);
        let collection: Array<IAsset> = [...c];
        if (existsAssetIndex > -1) {
            collection.splice(existsAssetIndex, 1);
        }
        return {
            ...state,
            collection: {...state.collection, ...{[langCode]: collection}},
            meta,
            error: undefined,
            isDeleteProcess: false,
            loading: false,
        };
    }),
);

export default selectorAssetsReducer;

import { createReducer, on } from '@ngrx/store';
import { IProductAssetsState } from '@store/state';
import { ProductAssetsActions } from '@store/actions/product-assets.action';
import { IAsset } from '@models';

export const initialState: IProductAssetsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const productAssetsReducer = createReducer(
    initialState,
    on(ProductAssetsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(ProductAssetsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(ProductAssetsActions.createRequest, ProductAssetsActions.uploadResourceRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(ProductAssetsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(ProductAssetsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(ProductAssetsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductAssetsActions.createError, ProductAssetsActions.uploadResourceError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ProductAssetsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(ProductAssetsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(ProductAssetsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductAssetsActions.createSuccess, ProductAssetsActions.uploadResourceSuccess, (state, { asset, langCode, tmpAsset, meta }) => {
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
    on(ProductAssetsActions.createProgress, ProductAssetsActions.uploadResourceProgress, (state, { tmpAsset, langCode, progress }) => {
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
    on(ProductAssetsActions.updateSuccess, (state, { asset, langCode, meta }) => {
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
    on(ProductAssetsActions.deleteSuccess, (state, { id, langCode, meta }) => {
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

export default productAssetsReducer;

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
    on(SelectorAssetsActions.createRequest, state => {
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
    on(SelectorAssetsActions.createError, (state, { error }) => {
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
    on(SelectorAssetsActions.createSuccess, (state, { asset, tmpAsset, meta }) => {
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
    on(SelectorAssetsActions.createProgress, (state, { tmpAsset, progress }) => {
        const existsAssetIndex = state.collection.findIndex(p => p.id === tmpAsset.id);
        let collection = [...state.collection];
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
            collection,
        };
    }),
    on(SelectorAssetsActions.updateSuccess, (state, { asset, meta }) => {
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
    on(SelectorAssetsActions.deleteSuccess, (state, { id, meta }) => {
        const existsAssetIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IAsset> = [...state.collection];
        if (existsAssetIndex > -1) {
            collection.splice(existsAssetIndex, 1);
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

export default selectorAssetsReducer;

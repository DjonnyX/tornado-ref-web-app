import { createReducer, on } from '@ngrx/store';
import { IAppThemeAssetsState } from '@store/state';
import { AppThemeAssetsActions } from '@store/actions/app-theme-assets.action';
import { IAsset } from '@models';

export const initialState: IAppThemeAssetsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const tagAssetsReducer = createReducer(
    initialState,
    on(AppThemeAssetsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(AppThemeAssetsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AppThemeAssetsActions.createRequest, AppThemeAssetsActions.uploadResourceRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(AppThemeAssetsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AppThemeAssetsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(AppThemeAssetsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AppThemeAssetsActions.createError, AppThemeAssetsActions.uploadResourceError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AppThemeAssetsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AppThemeAssetsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(AppThemeAssetsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AppThemeAssetsActions.createSuccess, AppThemeAssetsActions.uploadResourceSuccess, (state, { asset, tmpAsset, meta }) => {
        const c = state.collection || [];
        const existsTmpAssetIndex = c.findIndex(p => p.id === tmpAsset.id);
        let collection = [...c, asset];
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
    on(AppThemeAssetsActions.createProgress, AppThemeAssetsActions.uploadResourceProgress, (state, { tmpAsset, progress }) => {
        const c = state.collection || [];
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
            collection,
        };
    }),
    on(AppThemeAssetsActions.updateSuccess, (state, { asset, meta }) => {
        const c = state.collection || [];
        const existsAssetIndex = c.findIndex(p => p.id === asset.id);
        let collection = [...c];
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
    on(AppThemeAssetsActions.deleteSuccess, (state, { id, meta }) => {
        const c = state.collection || [];
        const existsAssetIndex = c.findIndex(p => p.id === id);
        let collection: Array<IAsset> = [...c];
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

export default tagAssetsReducer;

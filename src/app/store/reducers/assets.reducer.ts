import { createReducer, on } from '@ngrx/store';
import { IAssetsState } from '@store/state';
import { AssetsActions } from '@store/actions/assets.action';
import { IAsset } from '@models';

export const initialState: IAssetsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const assetsReducer = createReducer(
    initialState,
    on(AssetsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(AssetsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AssetsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(AssetsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AssetsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(AssetsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AssetsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AssetsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AssetsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(AssetsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AssetsActions.createSuccess, (state, { asset, meta }) => {
        return {
            ...state,
            collection: [...state.collection, asset],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AssetsActions.updateSuccess, (state, { asset, meta }) => {
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
    on(AssetsActions.deleteSuccess, (state, { id, meta }) => {
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

export default assetsReducer;

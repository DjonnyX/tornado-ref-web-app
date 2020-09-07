import { createReducer, on } from '@ngrx/store';
import { IOrderTypeAssetsState } from '@store/state';
import { OrderTypeAssetsActions } from '@store/actions/order-type-assets.action';
import { IAsset } from '@models';

export const initialState: IOrderTypeAssetsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const orderTypeAssetsReducer = createReducer(
    initialState,
    on(OrderTypeAssetsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(OrderTypeAssetsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(OrderTypeAssetsActions.createRequest, OrderTypeAssetsActions.uploadResourceRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(OrderTypeAssetsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(OrderTypeAssetsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(OrderTypeAssetsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeAssetsActions.createError, OrderTypeAssetsActions.uploadResourceError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeAssetsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeAssetsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeAssetsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeAssetsActions.createSuccess, OrderTypeAssetsActions.uploadResourceSuccess, (state, { asset, langCode, tmpAsset, meta }) => {
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
    on(OrderTypeAssetsActions.createProgress, OrderTypeAssetsActions.uploadResourceProgress, (state, { tmpAsset, langCode, progress }) => {
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
    on(OrderTypeAssetsActions.updateSuccess, (state, { asset, langCode, meta }) => {
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
    on(OrderTypeAssetsActions.deleteSuccess, (state, { id, langCode, meta }) => {
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

export default orderTypeAssetsReducer;

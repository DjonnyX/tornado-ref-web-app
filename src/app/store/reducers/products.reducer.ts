import { createReducer, on } from '@ngrx/store';
import { IProductsState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { IProduct } from '@app/models/product.model';

export const initialState: IProductsState = {
    meta: undefined,
    loading: false,
    isUploadAssetProcess: false,
    isRemoveAssetProcess: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
    newProduct: undefined,
    editProduct: undefined,
};

const productsReducer = createReducer(
    initialState,
    on(ProductsActions.uploadAssetRequest, state => {
        return {
            ...state,
            loading: true,
            isUploadAssetProcess: true,
        };
    }),
    on(ProductsActions.removeAssetRequest, state => {
        return {
            ...state,
            loading: true,
            isRemoveAssetProcess: true,
        };
    }),
    on(ProductsActions.setNewProduct, (state, { product }) => {
        return {
            ...state,
            newProduct: product,
        };
    }),
    on(ProductsActions.setEditProduct, (state, { product }) => {
        return {
            ...state,
            editProduct: product,
        };
    }),
    on(ProductsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(ProductsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(ProductsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(ProductsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(ProductsActions.uploadAssetError, (state, { error }) => {
        return {
            ...state,
            error,
            isUploadAssetProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.removeAssetError, (state, { error }) => {
        return {
            ...state,
            error,
            isRemoveAssetProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.uploadAssetSuccess, state => {
        return {
            ...state,
            error: undefined,
            isUploadAssetProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.removeAssetSuccess, state => {
        return {
            ...state,
            error: undefined,
            isRemoveAssetProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.createSuccess, (state, { product, meta }) => {
        return {
            ...state,
            collection: [...state.collection, product],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ProductsActions.updateSuccess, (state, { product, meta }) => {
        const existsProductIndex = state.collection.findIndex(p => p.id === product.id);
        let collection = [...state.collection];
        if (existsProductIndex > -1) {
            collection.splice(existsProductIndex, 1);
            collection.splice(existsProductIndex, 0, product);
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
    on(ProductsActions.deleteSuccess, (state, { id, meta }) => {
        const existsProductIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IProduct> = [...state.collection];
        if (existsProductIndex > -1) {
            collection.splice(existsProductIndex, 1);
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

export default productsReducer;

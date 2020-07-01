import { createReducer, on } from '@ngrx/store';
import { IProductsState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { IProduct } from '@app/models/product.model';

export const initialState: IProductsState = {
    meta: undefined,
    loading: false,
    error: undefined,
    collection: undefined,
};

const productsReducer = createReducer(
    initialState,
    on(ProductsActions.getAllRequest, ProductsActions.createRequest, ProductsActions.updateRequest, ProductsActions.deleteRequest, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(ProductsActions.getAllError, ProductsActions.createError, ProductsActions.updateError, ProductsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            loading: false,
        };
    }),
    on(ProductsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            loading: false,
        };
    }),
    on(ProductsActions.createSuccess, (state, { product, meta }) => {
        return {
            ...state,
            collection: [...state.collection, product],
            meta,
            error: undefined,
            loading: false,
        };
    }),
    on(ProductsActions.updateSuccess, (state, { product, meta }) => {
        const existsProductIndex = state.collection.findIndex(p => p.id === product.id);
        let collection = [...state.collection];
        if (existsProductIndex > -1) {
            collection.splice(existsProductIndex, 1);
            this.splice( existsProductIndex, 0, product );
        }
        return {
            ...state,
            collection,
            meta,
            error: undefined,
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
            loading: false,
        };
    }),
);

export default productsReducer;

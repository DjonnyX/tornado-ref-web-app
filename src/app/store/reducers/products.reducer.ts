import { createReducer, on } from '@ngrx/store';
import { IProductsState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { IProduct } from '@djonnyx/tornado-types';

export const initialState: IProductsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const productsReducer = createReducer(
    initialState,
    on(ProductsActions.clear, state => {
        return {
            ...initialState,
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
    on(ProductsActions.updateRequest, ProductsActions.repositionRequest, state => {
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
    on(ProductsActions.updateError, ProductsActions.repositionError, (state, { error }) => {
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
    on(ProductsActions.repositionSuccess, (state, { positions, meta }) => {
        const positionsDictionary: { [id: string]: number } = {};
        positions?.forEach(pos => {
            positionsDictionary[pos.id] = pos.position;
        });
        const collection = (state.collection || [])
            .map(
                item => {
                    const newItem = { ...item };
                    const pos = positionsDictionary[newItem.id];
                    if (pos !== undefined) {
                        newItem.position = pos;
                    }

                    return newItem;
                }
            );

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

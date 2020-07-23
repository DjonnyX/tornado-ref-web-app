import { createReducer, on } from '@ngrx/store';
import { IProductState } from '@store/state';
import { ProductActions } from '@store/actions/product.action';

export const initialState: IProductState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    product: undefined,
};

const productReducer = createReducer(
    initialState,
    on(ProductActions.update, (state, { product }) => {
        return {
            ...initialState,
            product,
        };
    }),
    on(ProductActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(ProductActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(ProductActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(ProductActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(ProductActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ProductActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(ProductActions.getSuccess, (state, { product }) => {
        return {
            ...state,
            product,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ProductActions.createSuccess, (state, { product }) => {
        return {
            ...state,
            product,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(ProductActions.updateSuccess, (state, { product }) => {
        return {
            ...state,
            product,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default productReducer;

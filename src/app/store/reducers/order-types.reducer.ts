import { createReducer, on } from '@ngrx/store';
import { IOrderType } from '@djonnyx/tornado-types';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { IOrderTypesState } from '@store/state/order-types.state';

export const initialState: IOrderTypesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const orderTypesReducer = createReducer(
    initialState,
    on(OrderTypesActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(OrderTypesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(OrderTypesActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(OrderTypesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(OrderTypesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(OrderTypesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(OrderTypesActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(OrderTypesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(OrderTypesActions.createSuccess, (state, { orderType, meta }) => {
        return {
            ...state,
            collection: [...state.collection, orderType],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypesActions.updateSuccess, (state, { orderType, meta }) => {
        const existsOrderTypeIndex = state.collection.findIndex(p => p.id === orderType.id);
        let collection = [...state.collection];
        if (existsOrderTypeIndex > -1) {
            collection.splice(existsOrderTypeIndex, 1);
            collection.splice(existsOrderTypeIndex, 0, orderType);
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
    on(OrderTypesActions.deleteSuccess, (state, { id, meta }) => {
        const existsOrderTypeIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IOrderType> = [...state.collection];
        if (existsOrderTypeIndex > -1) {
            collection.splice(existsOrderTypeIndex, 1);
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

export default orderTypesReducer;

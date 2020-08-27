import { createReducer, on } from '@ngrx/store';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { IOrderTypeState } from '@store/state/order-type.state';
import { deepMergeObjects } from '@app/utils/object.util';

export const initialState: IOrderTypeState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    orderType: undefined,
};

const orderTypeReducer = createReducer(
    initialState,
    on(OrderTypeActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(OrderTypeActions.updateImage, (state, { langCode, imageType, assetId }) => {
        const product = deepMergeObjects(state.orderType, {
            contents: {
                [langCode]: {
                    images: {
                        [imageType]: assetId,
                    },
                },
            },
        });
        return {
            ...initialState,
            product,
        };
    }),
    on(OrderTypeActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(OrderTypeActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(OrderTypeActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(OrderTypeActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeActions.getSuccess, (state, { orderType }) => {
        return {
            ...state,
            orderType,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeActions.createSuccess, (state, { orderType }) => {
        return {
            ...state,
            orderType,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(OrderTypeActions.updateSuccess, (state, { orderType }) => {
        return {
            ...state,
            orderType,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default orderTypeReducer;

import { createReducer, on } from '@ngrx/store';
import { ISubscription } from '@djonnyx/tornado-types';
import { SubscriptionsActions } from '@store/actions/subscriptions.action';
import { ISubscriptionsState } from '@store/state/subscriptions.state';

export const initialState: ISubscriptionsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const subscriptionsReducer = createReducer(
    initialState,
    on(SubscriptionsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(SubscriptionsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(SubscriptionsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(SubscriptionsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(SubscriptionsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionsActions.updateSuccess, (state, { subscription, meta }) => {
        const existsSubscriptionIndex = state.collection.findIndex(p => p.id === subscription.id);
        let collection = [...state.collection];
        if (existsSubscriptionIndex > -1) {
            collection.splice(existsSubscriptionIndex, 1);
            collection.splice(existsSubscriptionIndex, 0, subscription);
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
    on(SubscriptionsActions.deleteSuccess, (state, { id, meta }) => {
        const existsSubscriptionIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ISubscription> = [...state.collection];
        if (existsSubscriptionIndex > -1) {
            collection.splice(existsSubscriptionIndex, 1);
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

export default subscriptionsReducer;

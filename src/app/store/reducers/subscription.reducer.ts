import { createReducer, on } from '@ngrx/store';
import { SubscriptionActions } from '@store/actions/subscription.action';
import { ISubscriptionState } from '@store/state/subscription.state';

export const initialState: ISubscriptionState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    subscription: undefined,
};

const subscriptionReducer = createReducer(
    initialState,
    on(SubscriptionActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(SubscriptionActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(SubscriptionActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(SubscriptionActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(SubscriptionActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionActions.getSuccess, (state, { subscription }) => {
        return {
            ...state,
            subscription,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionActions.createSuccess, (state, { subscription }) => {
        return {
            ...state,
            subscription,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SubscriptionActions.updateSuccess, (state, { subscription }) => {
        return {
            ...state,
            subscription,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default subscriptionReducer;

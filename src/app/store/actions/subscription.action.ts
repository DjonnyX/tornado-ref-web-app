import { createAction, props } from "@ngrx/store";
import { ISubscription } from '@djonnyx/tornado-types';

export enum SubscriptionActionTypes {
    GET_REQUEST = "TORNADO/subscription/get:request",
    GET_SUCCESS = "TORNADO/subscription/get:success",
    GET_ERROR = "TORNADO/subscription/get:error",

    CREATE_REQUEST = "TORNADO/subscription/create:request",
    CREATE_SUCCESS = "TORNADO/subscription/create:success",
    CREATE_ERROR = "TORNADO/subscription/create:error",

    UPDATE_REQUEST = "TORNADO/subscription/update:request",
    UPDATE_SUCCESS = "TORNADO/subscription/update:success",
    UPDATE_ERROR = "TORNADO/subscription/update:error",

    CLEAR = "TORNADO/subscription/clear",
}

export namespace SubscriptionActions {
    // get
    export const getRequest = createAction(
        SubscriptionActionTypes.GET_REQUEST,
        props<{ id: string, extended?: boolean }>(),
    );
    export const getSuccess = createAction(
        SubscriptionActionTypes.GET_SUCCESS,
        props<{ subscription: ISubscription }>(),
    );
    export const getError = createAction(
        SubscriptionActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        SubscriptionActionTypes.CREATE_REQUEST,
        props<{ subscription: ISubscription }>()
    );
    export const createSuccess = createAction(
        SubscriptionActionTypes.CREATE_SUCCESS,
        props<{ subscription: ISubscription }>()
    );
    export const createError = createAction(
        SubscriptionActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        SubscriptionActionTypes.UPDATE_REQUEST,
        props<{ id: string, subscription: ISubscription }>()
    );
    export const updateSuccess = createAction(
        SubscriptionActionTypes.UPDATE_SUCCESS,
        props<{ subscription: ISubscription }>()
    );
    export const updateError = createAction(
        SubscriptionActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        SubscriptionActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ISubscription, IRequestOptions } from '@djonnyx/tornado-types';

export enum SubscriptionsActionTypes {
    GET_ALL_REQUEST = "TORNADO/subscriptions/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/subscriptions/get-all:success",
    GET_ALL_ERROR = "TORNADO/subscriptions/get-all:error",

    GET_REQUEST = "TORNADO/subscriptions/get:request",
    GET_SUCCESS = "TORNADO/subscriptions/get:success",
    GET_ERROR = "TORNADO/subscriptions/get:error",

    CREATE_REQUEST = "TORNADO/subscriptions/create:request",
    CREATE_SUCCESS = "TORNADO/subscriptions/create:success",
    CREATE_ERROR = "TORNADO/subscriptions/create:error",

    UPDATE_REQUEST = "TORNADO/subscriptions/update:request",
    UPDATE_SUCCESS = "TORNADO/subscriptions/update:success",
    UPDATE_ERROR = "TORNADO/subscriptions/update:error",

    DELETE_REQUEST = "TORNADO/subscriptions/delete:request",
    DELETE_SUCCESS = "TORNADO/subscriptions/delete:success",
    DELETE_ERROR = "TORNADO/subscriptions/delete:error",

    CLEAR = "TORNADO/subscriptions/clear",
}

export namespace SubscriptionsActions {
    // getAll
    export const getAllRequest = createAction(
        SubscriptionsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        SubscriptionsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ISubscription>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        SubscriptionsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        SubscriptionsActionTypes.GET_REQUEST,
        props<{ subscriptionId: string }>()
    );
    export const getSuccess = createAction(
        SubscriptionsActionTypes.GET_SUCCESS,
        props<{ subscription: ISubscription, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        SubscriptionsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        SubscriptionsActionTypes.UPDATE_REQUEST,
        props<{ id: string, subscription: ISubscription }>(),
    );
    export const updateSuccess = createAction(
        SubscriptionsActionTypes.UPDATE_SUCCESS,
        props<{ subscription: ISubscription, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        SubscriptionsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        SubscriptionsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        SubscriptionsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        SubscriptionsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        SubscriptionsActionTypes.CLEAR,
    );
}

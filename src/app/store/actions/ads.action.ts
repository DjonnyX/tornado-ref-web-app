import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IAd } from '@djonnyx/tornado-types';

export enum AdsActionTypes {
    GET_ALL_REQUEST = "TORNADO/ads/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/ads/get-all:success",
    GET_ALL_ERROR = "TORNADO/ads/get-all:error",

    GET_REQUEST = "TORNADO/ads/get:request",
    GET_SUCCESS = "TORNADO/ads/get:success",
    GET_ERROR = "TORNADO/ads/get:error",

    CREATE_REQUEST = "TORNADO/ads/create:request",
    CREATE_SUCCESS = "TORNADO/ads/create:success",
    CREATE_ERROR = "TORNADO/ads/create:error",

    UPDATE_REQUEST = "TORNADO/ads/update:request",
    UPDATE_SUCCESS = "TORNADO/ads/update:success",
    UPDATE_ERROR = "TORNADO/ads/update:error",

    DELETE_REQUEST = "TORNADO/ads/delete:request",
    DELETE_SUCCESS = "TORNADO/ads/delete:success",
    DELETE_ERROR = "TORNADO/ads/delete:error",
}

export namespace AdsActions {
    // getAll
    export const getAllRequest = createAction(
        AdsActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        AdsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAd>, meta: IMetaRefsResponse }>()
    );
    export const getAllError = createAction(
        AdsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>()
    );

    // get
    export const getRequest = createAction(
        AdsActionTypes.GET_REQUEST,
        props<{ adId: string }>()
    );
    export const getSuccess = createAction(
        AdsActionTypes.GET_SUCCESS,
        props<{ ad: IAd, meta: IMetaRefsResponse }>()
    );
    export const getError = createAction(
        AdsActionTypes.GET_ERROR,
        props<{ error: string }>()
    );

    // create
    export const createRequest = createAction(
        AdsActionTypes.CREATE_REQUEST,
        props<IAd>()
    );
    export const createSuccess = createAction(
        AdsActionTypes.CREATE_SUCCESS,
        props<{ ad: IAd, meta: IMetaRefsResponse }>()
    );
    export const createError = createAction(
        AdsActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        AdsActionTypes.UPDATE_REQUEST,
        props<{ id: string, ad: IAd }>()
    );
    export const updateSuccess = createAction(
        AdsActionTypes.UPDATE_SUCCESS,
        props<{ ad: IAd, meta: IMetaRefsResponse }>()
    );
    export const updateError = createAction(
        AdsActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // delete
    export const deleteRequest = createAction(
        AdsActionTypes.DELETE_REQUEST,
        props<{ id: string }>()
    );
    export const deleteSuccess = createAction(
        AdsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>()
    );
    export const deleteError = createAction(
        AdsActionTypes.DELETE_ERROR,
        props<{ error: string }>()
    );
}

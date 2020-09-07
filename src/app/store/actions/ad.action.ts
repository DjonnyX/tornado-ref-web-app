import { createAction, props } from "@ngrx/store";
import { IAd, AdResourceTypes, AdTypes } from '@djonnyx/tornado-types';

export enum AdActionTypes {
    GET_REQUEST = "TORNADO/ad/get:request",
    GET_SUCCESS = "TORNADO/ad/get:success",
    GET_ERROR = "TORNADO/ad/get:error",

    CREATE_REQUEST = "TORNADO/ad/create:request",
    CREATE_SUCCESS = "TORNADO/ad/create:success",
    CREATE_ERROR = "TORNADO/ad/create:error",

    UPDATE_REQUEST = "TORNADO/ad/update:request",
    UPDATE_SUCCESS = "TORNADO/ad/update:success",
    UPDATE_ERROR = "TORNADO/ad/update:error",

    UPDATE_RESOURCE = "TORNADO/ad/update-resources",

    UPDATE = "TORNADO/ad/update",

    CLEAR = "TORNADO/ad/clear",
}

export namespace AdActions {
    // get
    export const getRequest = createAction(
        AdActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        AdActionTypes.GET_SUCCESS,
        props<{ ad: IAd }>(),
    );
    export const getError = createAction(
        AdActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        AdActionTypes.CREATE_REQUEST,
        props<{ ad: IAd }>()
    );
    export const createSuccess = createAction(
        AdActionTypes.CREATE_SUCCESS,
        props<{ ad: IAd }>()
    );
    export const createError = createAction(
        AdActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        AdActionTypes.UPDATE_REQUEST,
        props<{ id: string, ad: IAd }>()
    );
    export const updateSuccess = createAction(
        AdActionTypes.UPDATE_SUCCESS,
        props<{ ad: IAd }>()
    );
    export const updateError = createAction(
        AdActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // updateResource
    export const updateResource = createAction(
        AdActionTypes.UPDATE_RESOURCE,
        props<{ langCode: string, resourcesType: AdResourceTypes, assetId: string }>(),
    );

    // update state
    export const update = createAction(
        AdActionTypes.UPDATE,
        props<{ ad: IAd }>(),
    );

    // clear
    export const clear = createAction(
        AdActionTypes.CLEAR,
    );
}

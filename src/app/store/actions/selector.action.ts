import { createAction, props } from "@ngrx/store";
import { ISelector, SelectorImageTypes } from '@djonnyx/tornado-types';

export enum SelectorActionTypes {
    GET_REQUEST = "TORNADO/selector/get:request",
    GET_SUCCESS = "TORNADO/selector/get:success",
    GET_ERROR = "TORNADO/selector/get:error",

    CREATE_REQUEST = "TORNADO/selector/create:request",
    CREATE_SUCCESS = "TORNADO/selector/create:success",
    CREATE_ERROR = "TORNADO/selector/create:error",

    UPDATE_REQUEST = "TORNADO/selector/update:request",
    UPDATE_SUCCESS = "TORNADO/selector/update:success",
    UPDATE_ERROR = "TORNADO/selector/update:error",

    UPDATE_IMAGE = "TORNADO/selector/update-resources",

    UPDATE = "TORNADO/selector/update",

    CLEAR = "TORNADO/selector/clear",
}

export namespace SelectorActions {
    // get
    export const getRequest = createAction(
        SelectorActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        SelectorActionTypes.GET_SUCCESS,
        props<{ selector: ISelector }>(),
    );
    export const getError = createAction(
        SelectorActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        SelectorActionTypes.CREATE_REQUEST,
        props<{ selector: ISelector }>()
    );
    export const createSuccess = createAction(
        SelectorActionTypes.CREATE_SUCCESS,
        props<{ selector: ISelector }>()
    );
    export const createError = createAction(
        SelectorActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        SelectorActionTypes.UPDATE_REQUEST,
        props<{ id: string, selector: ISelector }>()
    );
    export const updateSuccess = createAction(
        SelectorActionTypes.UPDATE_SUCCESS,
        props<{ selector: ISelector }>()
    );
    export const updateError = createAction(
        SelectorActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // updateImage
    export const updateImage = createAction(
        SelectorActionTypes.UPDATE_IMAGE,
        props<{ langCode: string, resourcesType: SelectorImageTypes, assetId: string }>(),
    );

    // update state
    export const update = createAction(
        SelectorActionTypes.UPDATE,
        props<{ selector: ISelector }>(),
    );

    // clear
    export const clear = createAction(
        SelectorActionTypes.CLEAR,
    );
}

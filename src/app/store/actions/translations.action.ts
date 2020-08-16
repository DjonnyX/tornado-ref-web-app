import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ITranslation } from '@djonnyx/tornado-types';

export enum TranslationsActionTypes {
    GET_ALL_REQUEST = "TORNADO/translation/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/translation/get-all:success",
    GET_ALL_ERROR = "TORNADO/translation/get-all:error",

    GET_REQUEST = "TORNADO/translation/get:request",
    GET_SUCCESS = "TORNADO/translation/get:success",
    GET_ERROR = "TORNADO/translation/get:error",

    CREATE_REQUEST = "TORNADO/translation/create:request",
    CREATE_SUCCESS = "TORNADO/translation/create:success",
    CREATE_ERROR = "TORNADO/translation/create:error",

    UPDATE_REQUEST = "TORNADO/translation/update:request",
    UPDATE_SUCCESS = "TORNADO/translation/update:success",
    UPDATE_ERROR = "TORNADO/translation/update:error",

    DELETE_REQUEST = "TORNADO/translation/delete:request",
    DELETE_SUCCESS = "TORNADO/translation/delete:success",
    DELETE_ERROR = "TORNADO/translation/delete:error",
}

export namespace TranslationsActions {
    // getAll
    export const getAllRequest = createAction(
        TranslationsActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        TranslationsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ITranslation>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        TranslationsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        TranslationsActionTypes.GET_REQUEST,
        props<{ translationId: string }>()
    );
    export const getSuccess = createAction(
        TranslationsActionTypes.GET_SUCCESS,
        props<{ translation: ITranslation, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        TranslationsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        TranslationsActionTypes.UPDATE_REQUEST,
        props<{ id: string, translation: ITranslation }>(),
    );
    export const updateSuccess = createAction(
        TranslationsActionTypes.UPDATE_SUCCESS,
        props<{ translation: ITranslation, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        TranslationsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );
}
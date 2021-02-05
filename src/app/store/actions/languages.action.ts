import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ILanguage } from '@djonnyx/tornado-types';

export enum LanguagesActionTypes {
    GET_ALL_REQUEST = "TORNADO/languages/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/languages/get-all:success",
    GET_ALL_ERROR = "TORNADO/languages/get-all:error",

    GET_REQUEST = "TORNADO/languages/get:request",
    GET_SUCCESS = "TORNADO/languages/get:success",
    GET_ERROR = "TORNADO/languages/get:error",

    CREATE_REQUEST = "TORNADO/languages/create:request",
    CREATE_SUCCESS = "TORNADO/languages/create:success",
    CREATE_ERROR = "TORNADO/languages/create:error",

    UPDATE_REQUEST = "TORNADO/languages/update:request",
    UPDATE_SUCCESS = "TORNADO/languages/update:success",
    UPDATE_ERROR = "TORNADO/languages/update:error",

    DELETE_REQUEST = "TORNADO/languages/delete:request",
    DELETE_SUCCESS = "TORNADO/languages/delete:success",
    DELETE_ERROR = "TORNADO/languages/delete:error",

    CLEAR = "TORNADO/languages/clear",
}

export namespace LanguagesActions {
    // getAll
    export const getAllRequest = createAction(
        LanguagesActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        LanguagesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ILanguage>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        LanguagesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        LanguagesActionTypes.GET_REQUEST,
        props<{ languageId: string }>()
    );
    export const getSuccess = createAction(
        LanguagesActionTypes.GET_SUCCESS,
        props<{ language: ILanguage, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        LanguagesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        LanguagesActionTypes.CREATE_REQUEST,
        props<{ language: ILanguage }>(),
    );
    export const createSuccess = createAction(
        LanguagesActionTypes.CREATE_SUCCESS,
        props<{ language: ILanguage, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        LanguagesActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        LanguagesActionTypes.UPDATE_REQUEST,
        props<{ id: string, language: ILanguage, setDafault?: boolean }>(),
    );
    export const updateSuccess = createAction(
        LanguagesActionTypes.UPDATE_SUCCESS,
        props<{ language: ILanguage, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        LanguagesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        LanguagesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        LanguagesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        LanguagesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        LanguagesActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { ILanguage } from '@djonnyx/tornado-types';

export enum LanguageActionTypes {
    GET_REQUEST = "TORNADO/language/get:request",
    GET_SUCCESS = "TORNADO/language/get:success",
    GET_ERROR = "TORNADO/language/get:error",

    CREATE_REQUEST = "TORNADO/language/create:request",
    CREATE_SUCCESS = "TORNADO/language/create:success",
    CREATE_ERROR = "TORNADO/language/create:error",

    UPDATE_REQUEST = "TORNADO/language/update:request",
    UPDATE_SUCCESS = "TORNADO/language/update:success",
    UPDATE_ERROR = "TORNADO/language/update:error",

    CLEAR = "TORNADO/language/clear",
}

export namespace LanguageActions {
    // get
    export const getRequest = createAction(
        LanguageActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        LanguageActionTypes.GET_SUCCESS,
        props<{ language: ILanguage }>(),
    );
    export const getError = createAction(
        LanguageActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        LanguageActionTypes.CREATE_REQUEST,
        props<{ language: ILanguage }>()
    );
    export const createSuccess = createAction(
        LanguageActionTypes.CREATE_SUCCESS,
        props<{ language: ILanguage }>()
    );
    export const createError = createAction(
        LanguageActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        LanguageActionTypes.UPDATE_REQUEST,
        props<{ id: string, language: ILanguage }>()
    );
    export const updateSuccess = createAction(
        LanguageActionTypes.UPDATE_SUCCESS,
        props<{ language: ILanguage }>()
    );
    export const updateError = createAction(
        LanguageActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        LanguageActionTypes.CLEAR,
    );
}

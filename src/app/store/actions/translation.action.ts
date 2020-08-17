import { createAction, props } from "@ngrx/store";
import { ITranslation } from '@djonnyx/tornado-types';

export enum TranslationActionTypes {
    GET_REQUEST = "TORNADO/translation/get:request",
    GET_SUCCESS = "TORNADO/translation/get:success",
    GET_ERROR = "TORNADO/translation/get:error",

    UPDATE_REQUEST = "TORNADO/translation/update:request",
    UPDATE_SUCCESS = "TORNADO/translation/update:success",
    UPDATE_ERROR = "TORNADO/translation/update:error",

    CLEAR = "TORNADO/translation/clear",
}

export namespace TranslationActions {
    // get
    export const getRequest = createAction(
        TranslationActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        TranslationActionTypes.GET_SUCCESS,
        props<{ translation: ITranslation }>(),
    );
    export const getError = createAction(
        TranslationActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        TranslationActionTypes.UPDATE_REQUEST,
        props<{ id: string, translation: ITranslation }>()
    );
    export const updateSuccess = createAction(
        TranslationActionTypes.UPDATE_SUCCESS,
        props<{ translation: ITranslation }>()
    );
    export const updateError = createAction(
        TranslationActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        TranslationActionTypes.CLEAR,
    );
}

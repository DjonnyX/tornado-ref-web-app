import { createAction, props } from "@ngrx/store";
import { IAppTheme } from '@djonnyx/tornado-types';

export enum AppThemeActionTypes {
    GET_REQUEST = "TORNADO/app-theme/get:request",
    GET_SUCCESS = "TORNADO/app-theme/get:success",
    GET_ERROR = "TORNADO/app-theme/get:error",

    CREATE_REQUEST = "TORNADO/app-theme/create:request",
    CREATE_SUCCESS = "TORNADO/app-theme/create:success",
    CREATE_ERROR = "TORNADO/app-theme/create:error",

    UPDATE_REQUEST = "TORNADO/app-theme/update:request",
    UPDATE_SUCCESS = "TORNADO/app-theme/update:success",
    UPDATE_ERROR = "TORNADO/app-theme/update:error",

    CLEAR = "TORNADO/app-theme/clear",
}

export namespace AppThemeActions {
    // get
    export const getRequest = createAction(
        AppThemeActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        AppThemeActionTypes.GET_SUCCESS,
        props<{ theme: IAppTheme }>(),
    );
    export const getError = createAction(
        AppThemeActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        AppThemeActionTypes.CREATE_REQUEST,
        props<{ theme: IAppTheme }>()
    );
    export const createSuccess = createAction(
        AppThemeActionTypes.CREATE_SUCCESS,
        props<{ theme: IAppTheme }>()
    );
    export const createError = createAction(
        AppThemeActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        AppThemeActionTypes.UPDATE_REQUEST,
        props<{ id: string, theme: IAppTheme }>()
    );
    export const updateSuccess = createAction(
        AppThemeActionTypes.UPDATE_SUCCESS,
        props<{ theme: IAppTheme }>()
    );
    export const updateError = createAction(
        AppThemeActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        AppThemeActionTypes.CLEAR,
    );
}

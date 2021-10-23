import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { IRequestOptions, IAppTheme, TerminalTypes } from '@djonnyx/tornado-types';

export enum AppThemesActionTypes {
    GET_ALL_REQUEST = "TORNADO/app-themes/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/app-themes/get-all:success",
    GET_ALL_ERROR = "TORNADO/app-themes/get-all:error",

    GET_REQUEST = "TORNADO/app-themes/get:request",
    GET_SUCCESS = "TORNADO/app-themes/get:success",
    GET_ERROR = "TORNADO/app-themes/get:error",

    CREATE_REQUEST = "TORNADO/app-themes/create:request",
    CREATE_SUCCESS = "TORNADO/app-themes/create:success",
    CREATE_ERROR = "TORNADO/app-themes/create:error",

    UPDATE_REQUEST = "TORNADO/app-themes/update:request",
    UPDATE_SUCCESS = "TORNADO/app-themes/update:success",
    UPDATE_ERROR = "TORNADO/app-themes/update:error",

    DELETE_REQUEST = "TORNADO/app-themes/delete:request",
    DELETE_SUCCESS = "TORNADO/app-themes/delete:success",
    DELETE_ERROR = "TORNADO/app-themes/delete:error",

    CLEAR = "TORNADO/app-themes/clear",
}

export namespace AppThemesActions {
    // getAll
    export const getAllRequest = createAction(
        AppThemesActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        AppThemesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<IAppTheme>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        AppThemesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        AppThemesActionTypes.GET_REQUEST,
        props<{ themeId: string }>()
    );
    export const getSuccess = createAction(
        AppThemesActionTypes.GET_SUCCESS,
        props<{ theme: IAppTheme, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        AppThemesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        AppThemesActionTypes.CREATE_REQUEST,
        props<{ theme: IAppTheme, terminalType: TerminalTypes }>(),
    );
    export const createSuccess = createAction(
        AppThemesActionTypes.CREATE_SUCCESS,
        props<{ theme: IAppTheme, meta: IMetaRefsResponse }>(),
    );
    export const createError = createAction(
        AppThemesActionTypes.CREATE_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        AppThemesActionTypes.UPDATE_REQUEST,
        props<{ id: string, theme: IAppTheme }>(),
    );
    export const updateSuccess = createAction(
        AppThemesActionTypes.UPDATE_SUCCESS,
        props<{ theme: IAppTheme, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        AppThemesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        AppThemesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        AppThemesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        AppThemesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        AppThemesActionTypes.CLEAR,
    );
}

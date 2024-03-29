import { createAction, props } from "@ngrx/store";
import { ILicenseAccount } from '@djonnyx/tornado-types';

export enum LicenseActionTypes {
    GET_REQUEST = "TORNADO/license/get:request",
    GET_SUCCESS = "TORNADO/license/get:success",
    GET_ERROR = "TORNADO/license/get:error",

    CREATE_REQUEST = "TORNADO/license/create:request",
    CREATE_SUCCESS = "TORNADO/license/create:success",
    CREATE_ERROR = "TORNADO/license/create:error",

    UPDATE_REQUEST = "TORNADO/license/update:request",
    UPDATE_SUCCESS = "TORNADO/license/update:success",
    UPDATE_ERROR = "TORNADO/license/update:error",

    CLEAR = "TORNADO/license/clear",
}

export namespace LicenseActions {
    // get
    export const getRequest = createAction(
        LicenseActionTypes.GET_REQUEST,
        props<{ id: string, extended?: boolean }>(),
    );
    export const getSuccess = createAction(
        LicenseActionTypes.GET_SUCCESS,
        props<{ license: ILicenseAccount }>(),
    );
    export const getError = createAction(
        LicenseActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        LicenseActionTypes.CREATE_REQUEST,
        props<{ license: ILicenseAccount }>()
    );
    export const createSuccess = createAction(
        LicenseActionTypes.CREATE_SUCCESS,
        props<{ license: ILicenseAccount }>()
    );
    export const createError = createAction(
        LicenseActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        LicenseActionTypes.UPDATE_REQUEST,
        props<{ id: string, license: ILicenseAccount }>()
    );
    export const updateSuccess = createAction(
        LicenseActionTypes.UPDATE_SUCCESS,
        props<{ license: ILicenseAccount }>()
    );
    export const updateError = createAction(
        LicenseActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        LicenseActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { ILicenseType } from '@djonnyx/tornado-types';

export enum LicenseTypeActionTypes {
    GET_REQUEST = "TORNADO/license-type/get:request",
    GET_SUCCESS = "TORNADO/license-type/get:success",
    GET_ERROR = "TORNADO/license-type/get:error",

    CREATE_REQUEST = "TORNADO/license-type/create:request",
    CREATE_SUCCESS = "TORNADO/license-type/create:success",
    CREATE_ERROR = "TORNADO/license-type/create:error",

    UPDATE_REQUEST = "TORNADO/license-type/update:request",
    UPDATE_SUCCESS = "TORNADO/license-type/update:success",
    UPDATE_ERROR = "TORNADO/license-type/update:error",

    CLEAR = "TORNADO/license-type/clear",
}

export namespace LicenseTypeActions {
    // get
    export const getRequest = createAction(
        LicenseTypeActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        LicenseTypeActionTypes.GET_SUCCESS,
        props<{ licenseType: ILicenseType }>(),
    );
    export const getError = createAction(
        LicenseTypeActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        LicenseTypeActionTypes.CREATE_REQUEST,
        props<{ licenseType: ILicenseType }>()
    );
    export const createSuccess = createAction(
        LicenseTypeActionTypes.CREATE_SUCCESS,
        props<{ licenseType: ILicenseType }>()
    );
    export const createError = createAction(
        LicenseTypeActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        LicenseTypeActionTypes.UPDATE_REQUEST,
        props<{ id: string, licenseType: ILicenseType }>()
    );
    export const updateSuccess = createAction(
        LicenseTypeActionTypes.UPDATE_SUCCESS,
        props<{ licenseType: ILicenseType }>()
    );
    export const updateError = createAction(
        LicenseTypeActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        LicenseTypeActionTypes.CLEAR,
    );
}

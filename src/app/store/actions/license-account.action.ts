import { createAction, props } from "@ngrx/store";
import { ILicenseAccount } from '@djonnyx/tornado-types';

export enum LicenseAccountActionTypes {
    GET_REQUEST = "TORNADO/license-account/get:request",
    GET_SUCCESS = "TORNADO/license-account/get:success",
    GET_ERROR = "TORNADO/license-account/get:error",

    CLEAR = "TORNADO/license-account/clear",
}

export namespace LicenseAccountActions {
    // get
    export const getRequest = createAction(
        LicenseAccountActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        LicenseAccountActionTypes.GET_SUCCESS,
        props<{ license: ILicenseAccount }>(),
    );
    export const getError = createAction(
        LicenseAccountActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        LicenseAccountActionTypes.CLEAR,
    );
}

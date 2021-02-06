import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ILicenseAccount, IRequestOptions } from '@djonnyx/tornado-types';

export enum LicensesAccountActionTypes {
    GET_ALL_REQUEST = "TORNADO/licenses-accountget-all:request",
    GET_ALL_SUCCESS = "TORNADO/licenses-accountget-all:success",
    GET_ALL_ERROR = "TORNADO/licenses-accountget-all:error",

    CLEAR = "TORNADO/licenses-account/clear",
}

export namespace LicensesAccountActions {
    // getAll
    export const getAllRequest = createAction(
        LicensesAccountActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        LicensesAccountActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ILicenseAccount>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        LicensesAccountActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // clear
    export const clear = createAction(
        LicensesAccountActionTypes.CLEAR,
    );
}

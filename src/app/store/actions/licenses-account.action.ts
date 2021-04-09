import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ILicenseAccount, IRequestOptions } from '@djonnyx/tornado-types';

export enum LicensesAccountActionTypes {
    GET_ALL_REQUEST = "TORNADO/licenses-account-get-all:request",
    GET_ALL_SUCCESS = "TORNADO/licenses-account-get-all:success",
    GET_ALL_ERROR = "TORNADO/licenses-account-get-all:error",
    UNBIND_REQUEST = "TORNADO/licenses-account-unbind:request",
    UNBIND_SUCCESS = "TORNADO/licenses-account-unbind:success",
    UNBIND_ERROR = "TORNADO/licenses-account-unbind:error",

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

    // unbind
    export const unbindRequest = createAction(
        LicensesAccountActionTypes.UNBIND_REQUEST,
        props<{ id: string }>(),
    );
    export const unbindSuccess = createAction(
        LicensesAccountActionTypes.UNBIND_SUCCESS,
        props<{ license: ILicenseAccount, meta: IMetaRefsResponse }>(),
    );
    export const unbindError = createAction(
        LicensesAccountActionTypes.UNBIND_ERROR,
        props<{ error: string }>(),
    );

    unbindRequest

    // clear
    export const clear = createAction(
        LicensesAccountActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ILicense } from '@djonnyx/tornado-types';

export enum LicensesActionTypes {
    GET_ALL_REQUEST = "TORNADO/licenses/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/licenses/get-all:success",
    GET_ALL_ERROR = "TORNADO/licenses/get-all:error",

    GET_REQUEST = "TORNADO/licenses/get:request",
    GET_SUCCESS = "TORNADO/licenses/get:success",
    GET_ERROR = "TORNADO/licenses/get:error",

    /*CREATE_REQUEST = "TORNADO/licenses/create:request",
    CREATE_SUCCESS = "TORNADO/licenses/create:success",
    CREATE_ERROR = "TORNADO/licenses/create:error",

    UPDATE_REQUEST = "TORNADO/licenses/update:request",
    UPDATE_SUCCESS = "TORNADO/licenses/update:success",
    UPDATE_ERROR = "TORNADO/licenses/update:error",

    DELETE_REQUEST = "TORNADO/licenses/delete:request",
    DELETE_SUCCESS = "TORNADO/licenses/delete:success",
    DELETE_ERROR = "TORNADO/licenses/delete:error",*/
}

export namespace LicensesActions {
    // getAll
    export const getAllRequest = createAction(
        LicensesActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        LicensesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ILicense>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        LicensesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        LicensesActionTypes.GET_REQUEST,
        props<{ licenseId: string }>()
    );
    export const getSuccess = createAction(
        LicensesActionTypes.GET_SUCCESS,
        props<{ license: ILicense, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        LicensesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    /*
    // update
    export const updateRequest = createAction(
        LicensesActionTypes.UPDATE_REQUEST,
        props<{ id: string, license: ILicense }>(),
    );
    export const updateSuccess = createAction(
        LicensesActionTypes.UPDATE_SUCCESS,
        props<{ license: ILicense, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        LicensesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        LicensesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        LicensesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        LicensesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );
    */
}

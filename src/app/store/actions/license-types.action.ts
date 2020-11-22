import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ILicenseType } from '@djonnyx/tornado-types';

export enum LicenseTypesActionTypes {
    GET_ALL_REQUEST = "TORNADO/license-types/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/license-types/get-all:success",
    GET_ALL_ERROR = "TORNADO/license-types/get-all:error",

    GET_REQUEST = "TORNADO/license-types/get:request",
    GET_SUCCESS = "TORNADO/license-types/get:success",
    GET_ERROR = "TORNADO/license-types/get:error",

    CREATE_REQUEST = "TORNADO/license-types/create:request",
    CREATE_SUCCESS = "TORNADO/license-types/create:success",
    CREATE_ERROR = "TORNADO/license-types/create:error",

    UPDATE_REQUEST = "TORNADO/license-types/update:request",
    UPDATE_SUCCESS = "TORNADO/license-types/update:success",
    UPDATE_ERROR = "TORNADO/license-types/update:error",

    DELETE_REQUEST = "TORNADO/license-types/delete:request",
    DELETE_SUCCESS = "TORNADO/license-types/delete:success",
    DELETE_ERROR = "TORNADO/license-types/delete:error",
}

export namespace LicenseTypesActions {
    // getAll
    export const getAllRequest = createAction(
        LicenseTypesActionTypes.GET_ALL_REQUEST,
    );
    export const getAllSuccess = createAction(
        LicenseTypesActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ILicenseType>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        LicenseTypesActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        LicenseTypesActionTypes.GET_REQUEST,
        props<{ licenseTypeId: string }>()
    );
    export const getSuccess = createAction(
        LicenseTypesActionTypes.GET_SUCCESS,
        props<{ licenseType: ILicenseType, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        LicenseTypesActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        LicenseTypesActionTypes.UPDATE_REQUEST,
        props<{ id: string, licenseType: ILicenseType }>(),
    );
    export const updateSuccess = createAction(
        LicenseTypesActionTypes.UPDATE_SUCCESS,
        props<{ licenseType: ILicenseType, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        LicenseTypesActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        LicenseTypesActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        LicenseTypesActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        LicenseTypesActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );
}

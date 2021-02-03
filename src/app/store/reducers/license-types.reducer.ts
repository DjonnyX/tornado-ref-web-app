import { createReducer, on } from '@ngrx/store';
import { ILicenseType } from '@djonnyx/tornado-types';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { ILicenseTypesState } from '@store/state/license-types.state';

export const initialState: ILicenseTypesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    /*isUpdateProcess: false,
    isDeleteProcess: false,*/
    error: undefined,
    collection: undefined,
};

const licenseTypesReducer = createReducer(
    initialState,
    on(LicenseTypesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    /*on(LicenseTypesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(LicenseTypesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),*/
    on(LicenseTypesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(LicenseTypesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(LicenseTypesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),*/
    on(LicenseTypesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(LicenseTypesActions.updateSuccess, (state, { licenseType, meta }) => {
        const existsLicenseTypeIndex = state.collection.findIndex(p => p.id === licenseType.id);
        let collection = [...state.collection];
        if (existsLicenseTypeIndex > -1) {
            collection.splice(existsLicenseTypeIndex, 1);
            collection.splice(existsLicenseTypeIndex, 0, licenseType);
        }
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(LicenseTypesActions.deleteSuccess, (state, { id, meta }) => {
        const existsLicenseTypeIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ILicenseType> = [...state.collection];
        if (existsLicenseTypeIndex > -1) {
            collection.splice(existsLicenseTypeIndex, 1);
        }
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isDeleteProcess: false,
            loading: false,
        };
    }),*/
);

export default licenseTypesReducer;

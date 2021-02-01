import { createReducer, on } from '@ngrx/store';
import { ILicense } from '@djonnyx/tornado-types';
import { LicensesActions } from '@store/actions/licenses.action';
import { ILicensesState } from '@store/state/licenses.state';

export const initialState: ILicensesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const licensesReducer = createReducer(
    initialState,
    on(LicensesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(LicensesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(LicensesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(LicensesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LicensesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(LicensesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(LicensesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LicensesActions.updateSuccess, (state, { license, meta }) => {
        const existsLicenseIndex = state.collection.findIndex(p => p.id === license.id);
        let collection = [...state.collection];
        if (existsLicenseIndex > -1) {
            collection.splice(existsLicenseIndex, 1);
            collection.splice(existsLicenseIndex, 0, license);
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
    on(LicensesActions.deleteSuccess, (state, { id, meta }) => {
        const existsLicenseIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ILicense> = [...state.collection];
        if (existsLicenseIndex > -1) {
            collection.splice(existsLicenseIndex, 1);
        }
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isDeleteProcess: false,
            loading: false,
        };
    }),
);

export default licensesReducer;

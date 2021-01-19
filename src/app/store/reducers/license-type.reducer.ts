import { createReducer, on } from '@ngrx/store';
import { LicenseTypeActions } from '@store/actions/license-type.action';
import { ILicenseTypeState } from '@store/state/license-type.state';

export const initialState: ILicenseTypeState = {
    loading: false,
    isGetProcess: false,
    /*isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,*/
    error: undefined,
    licenseType: undefined,
};

const licenseTypeReducer = createReducer(
    initialState,
    on(LicenseTypeActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(LicenseTypeActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    /*on(LicenseTypeActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(LicenseTypeActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),*/
    on(LicenseTypeActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(LicenseTypeActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LicenseTypeActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),*/
    on(LicenseTypeActions.getSuccess, (state, { licenseType }) => {
        return {
            ...state,
            licenseType,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(LicenseTypeActions.createSuccess, (state, { licenseType }) => {
        return {
            ...state,
            licenseType,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LicenseTypeActions.updateSuccess, (state, { licenseType }) => {
        return {
            ...state,
            licenseType,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),*/
);

export default licenseTypeReducer;

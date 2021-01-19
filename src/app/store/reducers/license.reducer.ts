import { createReducer, on } from '@ngrx/store';
import { LicenseActions } from '@store/actions/license.action';
import { ILicenseState } from '@store/state/license.state';

export const initialState: ILicenseState = {
    loading: false,
    isGetProcess: false,
    /*isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,*/
    error: undefined,
    license: undefined,
};

const licenseReducer = createReducer(
    initialState,
    on(LicenseActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(LicenseActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    /*on(LicenseActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(LicenseActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),*/
    on(LicenseActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(LicenseActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LicenseActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),*/
    on(LicenseActions.getSuccess, (state, { license }) => {
        return {
            ...state,
            license,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    /*on(LicenseActions.createSuccess, (state, { license }) => {
        return {
            ...state,
            license,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(LicenseActions.updateSuccess, (state, { license }) => {
        return {
            ...state,
            license,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),*/
);

export default licenseReducer;

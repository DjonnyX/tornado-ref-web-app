import { createReducer, on } from '@ngrx/store';
import { LicenseAccountActions } from '@store/actions/license-account.action';
import { ILicenseAccountState } from '@store/state/license-account.state';

export const initialState: ILicenseAccountState = {
    loading: false,
    isGetProcess: false,
    error: undefined,
    license: undefined,
};

const licenseAccountReducer = createReducer(
    initialState,
    on(LicenseAccountActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(LicenseAccountActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(LicenseAccountActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LicenseAccountActions.getSuccess, (state, { license }) => {
        return {
            ...state,
            license,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
);

export default licenseAccountReducer;

import { createReducer, on } from '@ngrx/store';
import { LicensesAccountActions } from '@store/actions/licenses-account.action';
import { ILicensesAccountState } from '@store/state/licenses-account.state';

export const initialState: ILicensesAccountState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUnbindProcess: false,
    error: undefined,
    collection: undefined,
};

const licensesAccountReducer = createReducer(
    initialState,
    on(LicensesAccountActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(LicensesAccountActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(LicensesAccountActions.unbindRequest, state => {
        return {
            ...state,
            isUnbindProcess: true,
            loading: true,
        };
    }),
    on(LicensesAccountActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LicensesAccountActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isUnbindProcess: false,
            loading: false,
        };
    }),
    on(LicensesAccountActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(LicensesAccountActions.unbindSuccess, (state, { license, meta }) => {
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
            isUnbindProcess: false,
            loading: false,
        };
    }),
);

export default licensesAccountReducer;

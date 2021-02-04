import { createReducer, on } from '@ngrx/store';
import { LicensesAccountActions } from '@store/actions/licenses-account.action';
import { ILicensesAccountState } from '@store/state/licenses-account.state';

export const initialState: ILicensesAccountState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    error: undefined,
    collection: undefined,
};

const licensesAccountReducer = createReducer(
    initialState,
    on(LicensesAccountActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
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
);

export default licensesAccountReducer;

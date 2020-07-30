import { createReducer, on } from '@ngrx/store';
import { BusinessPeriodActions } from '@store/actions/business-period.action';
import { IBusinessPeriodState } from '@store/state/business-period.state';

export const initialState: IBusinessPeriodState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    businessPeriod: undefined,
};

const businessPeriodReducer = createReducer(
    initialState,
    on(BusinessPeriodActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(BusinessPeriodActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(BusinessPeriodActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(BusinessPeriodActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(BusinessPeriodActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodActions.getSuccess, (state, { businessPeriod }) => {
        return {
            ...state,
            businessPeriod,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodActions.createSuccess, (state, { businessPeriod }) => {
        return {
            ...state,
            businessPeriod,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodActions.updateSuccess, (state, { businessPeriod }) => {
        return {
            ...state,
            businessPeriod,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default businessPeriodReducer;

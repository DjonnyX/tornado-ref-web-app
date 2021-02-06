import { createReducer, on } from '@ngrx/store';
import { IBusinessPeriodsState } from '@store/state';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

export const initialState: IBusinessPeriodsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const businessPeriodsReducer = createReducer(
    initialState,
    on(BusinessPeriodsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(BusinessPeriodsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(BusinessPeriodsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(BusinessPeriodsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(BusinessPeriodsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(BusinessPeriodsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodsActions.createSuccess, (state, { businessPeriod, meta }) => {
        return {
            ...state,
            collection: [...state.collection, businessPeriod],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(BusinessPeriodsActions.updateSuccess, (state, { businessPeriod, meta }) => {
        const existsBusinessPeriodIndex = state.collection.findIndex(p => p.id === businessPeriod.id);
        let collection = [...state.collection];
        if (existsBusinessPeriodIndex > -1) {
            collection.splice(existsBusinessPeriodIndex, 1);
            collection.splice(existsBusinessPeriodIndex, 0, businessPeriod);
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
    on(BusinessPeriodsActions.deleteSuccess, (state, { id, meta }) => {
        const existsBusinessPeriodIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IBusinessPeriod> = [...state.collection];
        if (existsBusinessPeriodIndex > -1) {
            collection.splice(existsBusinessPeriodIndex, 1);
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

export default businessPeriodsReducer;

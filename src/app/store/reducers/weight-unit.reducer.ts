import { createReducer, on } from '@ngrx/store';
import { WeightUnitActions } from '@store/actions/weight-unit.action';
import { IWeightUnitState } from '@store/state/weight-unit.state';

export const initialState: IWeightUnitState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    weightUnit: undefined,
};

const weightUnitReducer = createReducer(
    initialState,
    on(WeightUnitActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(WeightUnitActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(WeightUnitActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(WeightUnitActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(WeightUnitActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitActions.getSuccess, (state, { weightUnit }) => {
        return {
            ...state,
            weightUnit,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitActions.createSuccess, (state, { weightUnit }) => {
        return {
            ...state,
            weightUnit,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitActions.updateSuccess, (state, { weightUnit }) => {
        return {
            ...state,
            weightUnit,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default weightUnitReducer;

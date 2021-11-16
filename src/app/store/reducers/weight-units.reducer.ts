import { createReducer, on } from '@ngrx/store';
import { IWeightUnitsState } from '@store/state';
import { WeightUnitsActions } from '@store/actions/weight-units.action';
import { IWeightUnit } from '@djonnyx/tornado-types';

export const initialState: IWeightUnitsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const weightUnitsReducer = createReducer(
    initialState,
    on(WeightUnitsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(WeightUnitsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(WeightUnitsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(WeightUnitsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(WeightUnitsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(WeightUnitsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitsActions.createSuccess, (state, { weightUnit, meta }) => {
        return {
            ...state,
            collection: [...state.collection, weightUnit],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(WeightUnitsActions.updateSuccess, (state, { weightUnit, meta }) => {
        const existsWeightUnitIndex = state.collection.findIndex(p => p.id === weightUnit.id);
        let collection = [...state.collection];
        if (existsWeightUnitIndex > -1) {
            collection.splice(existsWeightUnitIndex, 1);
            collection.splice(existsWeightUnitIndex, 0, weightUnit);
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
    on(WeightUnitsActions.deleteSuccess, (state, { id, meta }) => {
        const existsWeightUnitIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IWeightUnit> = [...state.collection];
        if (existsWeightUnitIndex > -1) {
            collection.splice(existsWeightUnitIndex, 1);
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

export default weightUnitsReducer;

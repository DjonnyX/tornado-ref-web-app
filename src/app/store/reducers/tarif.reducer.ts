import { createReducer, on } from '@ngrx/store';
import { TarifActions } from '@store/actions/tarif.action';
import { ITarifState } from '@store/state/tarif.state';

export const initialState: ITarifState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    tarif: undefined,
};

const tarifReducer = createReducer(
    initialState,
    on(TarifActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(TarifActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TarifActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(TarifActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TarifActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TarifActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(TarifActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TarifActions.getSuccess, (state, { tarif }) => {
        return {
            ...state,
            tarif,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TarifActions.createSuccess, (state, { tarif }) => {
        return {
            ...state,
            tarif,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(TarifActions.updateSuccess, (state, { tarif }) => {
        return {
            ...state,
            tarif,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default tarifReducer;

import { createReducer, on } from '@ngrx/store';
import { ITarif } from '@djonnyx/tornado-types';
import { TarifsActions } from '@store/actions/tarifs.action';
import { ITarifsState } from '@store/state/tarifs.state';

export const initialState: ITarifsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const tarifsReducer = createReducer(
    initialState,
    on(TarifsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(TarifsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TarifsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TarifsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(TarifsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TarifsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TarifsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(TarifsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TarifsActions.updateSuccess, (state, { tarif, meta }) => {
        const existsTarifIndex = state.collection.findIndex(p => p.id === tarif.id);
        let collection = [...state.collection];
        if (existsTarifIndex > -1) {
            collection.splice(existsTarifIndex, 1);
            collection.splice(existsTarifIndex, 0, tarif);
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
    on(TarifsActions.deleteSuccess, (state, { id, meta }) => {
        const existsTarifIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ITarif> = [...state.collection];
        if (existsTarifIndex > -1) {
            collection.splice(existsTarifIndex, 1);
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

export default tarifsReducer;

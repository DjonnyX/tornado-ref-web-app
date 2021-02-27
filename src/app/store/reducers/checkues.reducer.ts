import { createReducer, on } from '@ngrx/store';
import { ICheckue } from '@djonnyx/tornado-types';
import { CheckuesActions } from '@store/actions/checkues.action';
import { ICheckuesState } from '@store/state/checkues.state';

export const initialState: ICheckuesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const checkuesReducer = createReducer(
    initialState,
    on(CheckuesActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(CheckuesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(CheckuesActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(CheckuesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(CheckuesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(CheckuesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CheckuesActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CheckuesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(CheckuesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(CheckuesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(CheckuesActions.createSuccess, (state, { checkue, meta }) => {
        return {
            ...state,
            collection: [...state.collection, checkue],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(CheckuesActions.updateSuccess, (state, { checkue, meta }) => {
        const existsCheckueIndex = state.collection.findIndex(p => p.id === checkue.id);
        let collection = [...state.collection];
        if (existsCheckueIndex > -1) {
            collection.splice(existsCheckueIndex, 1);
            collection.splice(existsCheckueIndex, 0, checkue);
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
    on(CheckuesActions.deleteSuccess, (state, { id, meta }) => {
        const existsCheckueIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ICheckue> = [...state.collection];
        if (existsCheckueIndex > -1) {
            collection.splice(existsCheckueIndex, 1);
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

export default checkuesReducer;

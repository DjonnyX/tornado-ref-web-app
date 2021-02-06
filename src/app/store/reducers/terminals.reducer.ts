import { createReducer, on } from '@ngrx/store';
import { ITerminal } from '@djonnyx/tornado-types';
import { TerminalsActions } from '@store/actions/terminals.action';
import { ITerminalsState } from '@store/state/terminals.state';

export const initialState: ITerminalsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const terminalsReducer = createReducer(
    initialState,
    on(TerminalsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(TerminalsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TerminalsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TerminalsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(TerminalsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TerminalsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TerminalsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(TerminalsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TerminalsActions.updateSuccess, (state, { terminal, meta }) => {
        const existsTerminalIndex = state.collection.findIndex(p => p.id === terminal.id);
        let collection = [...state.collection];
        if (existsTerminalIndex > -1) {
            collection.splice(existsTerminalIndex, 1);
            collection.splice(existsTerminalIndex, 0, terminal);
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
    on(TerminalsActions.deleteSuccess, (state, { id, meta }) => {
        const existsTerminalIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ITerminal> = [...state.collection];
        if (existsTerminalIndex > -1) {
            collection.splice(existsTerminalIndex, 1);
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

export default terminalsReducer;

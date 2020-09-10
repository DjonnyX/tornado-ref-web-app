import { createReducer, on } from '@ngrx/store';
import { TerminalActions } from '@store/actions/terminal.action';
import { ITerminalState } from '@store/state/terminal.state';

export const initialState: ITerminalState = {
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    terminal: undefined,
};

const terminalReducer = createReducer(
    initialState,
    on(TerminalActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(TerminalActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TerminalActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TerminalActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TerminalActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TerminalActions.getSuccess, (state, { terminal }) => {
        return {
            ...state,
            terminal,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TerminalActions.updateSuccess, (state, { terminal }) => {
        return {
            ...state,
            terminal,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default terminalReducer;

import { createAction, props } from "@ngrx/store";
import { ITerminal } from '@djonnyx/tornado-types';

export enum TerminalActionTypes {
    GET_REQUEST = "TORNADO/terminal/get:request",
    GET_SUCCESS = "TORNADO/terminal/get:success",
    GET_ERROR = "TORNADO/terminal/get:error",

    CREATE_REQUEST = "TORNADO/terminal/create:request",
    CREATE_SUCCESS = "TORNADO/terminal/create:success",
    CREATE_ERROR = "TORNADO/terminal/create:error",

    UPDATE_REQUEST = "TORNADO/terminal/update:request",
    UPDATE_SUCCESS = "TORNADO/terminal/update:success",
    UPDATE_ERROR = "TORNADO/terminal/update:error",

    CLEAR = "TORNADO/terminal/clear",
}

export namespace TerminalActions {
    // get
    export const getRequest = createAction(
        TerminalActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        TerminalActionTypes.GET_SUCCESS,
        props<{ terminal: ITerminal }>(),
    );
    export const getError = createAction(
        TerminalActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        TerminalActionTypes.UPDATE_REQUEST,
        props<{ id: string, terminal: ITerminal }>()
    );
    export const updateSuccess = createAction(
        TerminalActionTypes.UPDATE_SUCCESS,
        props<{ terminal: ITerminal }>()
    );
    export const updateError = createAction(
        TerminalActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        TerminalActionTypes.CLEAR,
    );
}

import { createAction, props } from "@ngrx/store";
import { IMetaRefsResponse } from '@services';
import { ITerminal, IRequestOptions } from '@djonnyx/tornado-types';

export enum TerminalsActionTypes {
    GET_ALL_REQUEST = "TORNADO/terminals/get-all:request",
    GET_ALL_SUCCESS = "TORNADO/terminals/get-all:success",
    GET_ALL_ERROR = "TORNADO/terminals/get-all:error",

    GET_REQUEST = "TORNADO/terminals/get:request",
    GET_SUCCESS = "TORNADO/terminals/get:success",
    GET_ERROR = "TORNADO/terminals/get:error",

    CREATE_REQUEST = "TORNADO/terminals/create:request",
    CREATE_SUCCESS = "TORNADO/terminals/create:success",
    CREATE_ERROR = "TORNADO/terminals/create:error",

    UPDATE_REQUEST = "TORNADO/terminals/update:request",
    UPDATE_SUCCESS = "TORNADO/terminals/update:success",
    UPDATE_ERROR = "TORNADO/terminals/update:error",

    DELETE_REQUEST = "TORNADO/terminals/delete:request",
    DELETE_SUCCESS = "TORNADO/terminals/delete:success",
    DELETE_ERROR = "TORNADO/terminals/delete:error",
}

export namespace TerminalsActions {
    // getAll
    export const getAllRequest = createAction(
        TerminalsActionTypes.GET_ALL_REQUEST,
        props<{ options?: IRequestOptions }>(),
    );
    export const getAllSuccess = createAction(
        TerminalsActionTypes.GET_ALL_SUCCESS,
        props<{ collection: Array<ITerminal>, meta: IMetaRefsResponse }>(),
    );
    export const getAllError = createAction(
        TerminalsActionTypes.GET_ALL_ERROR,
        props<{ error: string }>(),
    );

    // get
    export const getRequest = createAction(
        TerminalsActionTypes.GET_REQUEST,
        props<{ terminalId: string }>()
    );
    export const getSuccess = createAction(
        TerminalsActionTypes.GET_SUCCESS,
        props<{ terminal: ITerminal, meta: IMetaRefsResponse }>(),
    );
    export const getError = createAction(
        TerminalsActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // update
    export const updateRequest = createAction(
        TerminalsActionTypes.UPDATE_REQUEST,
        props<{ id: string, terminal: ITerminal }>(),
    );
    export const updateSuccess = createAction(
        TerminalsActionTypes.UPDATE_SUCCESS,
        props<{ terminal: ITerminal, meta: IMetaRefsResponse }>(),
    );
    export const updateError = createAction(
        TerminalsActionTypes.UPDATE_ERROR,
        props<{ error: string }>(),
    );

    // delete
    export const deleteRequest = createAction(
        TerminalsActionTypes.DELETE_REQUEST,
        props<{ id: string }>(),
    );
    export const deleteSuccess = createAction(
        TerminalsActionTypes.DELETE_SUCCESS,
        props<{ id: string, meta: IMetaRefsResponse }>(),
    );
    export const deleteError = createAction(
        TerminalsActionTypes.DELETE_ERROR,
        props<{ error: string }>(),
    );
}

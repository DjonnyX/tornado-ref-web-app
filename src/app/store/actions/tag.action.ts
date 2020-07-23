import { createAction, props } from "@ngrx/store";
import { ITag } from '@djonnyx/tornado-types';

export enum TagActionTypes {
    GET_REQUEST = "TORNADO/tag/get:request",
    GET_SUCCESS = "TORNADO/tag/get:success",
    GET_ERROR = "TORNADO/tag/get:error",

    CREATE_REQUEST = "TORNADO/tag/create:request",
    CREATE_SUCCESS = "TORNADO/tag/create:success",
    CREATE_ERROR = "TORNADO/tag/create:error",

    UPDATE_REQUEST = "TORNADO/tag/update:request",
    UPDATE_SUCCESS = "TORNADO/tag/update:success",
    UPDATE_ERROR = "TORNADO/tag/update:error",

    CLEAR = "TORNADO/tag/clear",
}

export namespace TagActions {
    // get
    export const getRequest = createAction(
        TagActionTypes.GET_REQUEST,
        props<{ id: string }>(),
    );
    export const getSuccess = createAction(
        TagActionTypes.GET_SUCCESS,
        props<{ tag: ITag }>(),
    );
    export const getError = createAction(
        TagActionTypes.GET_ERROR,
        props<{ error: string }>(),
    );

    // create
    export const createRequest = createAction(
        TagActionTypes.CREATE_REQUEST,
        props<{ tag: ITag }>()
    );
    export const createSuccess = createAction(
        TagActionTypes.CREATE_SUCCESS,
        props<{ tag: ITag }>()
    );
    export const createError = createAction(
        TagActionTypes.CREATE_ERROR,
        props<{ error: string }>()
    );

    // update
    export const updateRequest = createAction(
        TagActionTypes.UPDATE_REQUEST,
        props<{ id: string, tag: ITag }>()
    );
    export const updateSuccess = createAction(
        TagActionTypes.UPDATE_SUCCESS,
        props<{ tag: ITag }>()
    );
    export const updateError = createAction(
        TagActionTypes.UPDATE_ERROR,
        props<{ error: string }>()
    );

    // clear
    export const clear = createAction(
        TagActionTypes.CLEAR,
    );
}

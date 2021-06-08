import { createReducer, on } from '@ngrx/store';
import { ISystemTagsState } from '@store/state';
import { SystemTagsActions } from '@store/actions/system-tags.action';
import { ISystemTag } from '@djonnyx/tornado-types';

export const initialState: ISystemTagsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const systemTagsReducer = createReducer(
    initialState,
    on(SystemTagsActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(SystemTagsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(SystemTagsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(SystemTagsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(SystemTagsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(SystemTagsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SystemTagsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SystemTagsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SystemTagsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(SystemTagsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SystemTagsActions.createSuccess, (state, { systemTag, meta }) => {
        return {
            ...state,
            collection: [...state.collection, systemTag],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SystemTagsActions.updateSuccess, (state, { systemTag, meta }) => {
        const existsTagIndex = state.collection.findIndex(p => p.id === systemTag.id);
        let collection = [...state.collection];
        if (existsTagIndex > -1) {
            collection.splice(existsTagIndex, 1);
            collection.splice(existsTagIndex, 0, systemTag);
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
    on(SystemTagsActions.deleteSuccess, (state, { id, meta }) => {
        const existsTagIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ISystemTag> = [...state.collection];
        if (existsTagIndex > -1) {
            collection.splice(existsTagIndex, 1);
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

export default systemTagsReducer;

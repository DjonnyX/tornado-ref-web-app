import { createReducer, on } from '@ngrx/store';
import { ITagsState } from '@store/state';
import { TagsActions } from '@store/actions/tags.action';
import { ITag } from '@djonnyx/tornado-types';

export const initialState: ITagsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const tagsReducer = createReducer(
    initialState,
    on(TagsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TagsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(TagsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TagsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(TagsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TagsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(TagsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TagsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(TagsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TagsActions.createSuccess, (state, { tag, meta }) => {
        return {
            ...state,
            collection: [...state.collection, tag],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(TagsActions.updateSuccess, (state, { tag, meta }) => {
        const existsTagIndex = state.collection.findIndex(p => p.id === tag.id);
        let collection = [...state.collection];
        if (existsTagIndex > -1) {
            collection.splice(existsTagIndex, 1);
            collection.splice(existsTagIndex, 0, tag);
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
    on(TagsActions.deleteSuccess, (state, { id, meta }) => {
        const existsTagIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ITag> = [...state.collection];
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

export default tagsReducer;

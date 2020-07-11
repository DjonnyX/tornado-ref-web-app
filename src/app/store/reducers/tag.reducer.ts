import { createReducer, on } from '@ngrx/store';
import { TagActions } from '@store/actions/tag.action';
import { ITagState } from '@store/state/tag.state';

export const initialState: ITagState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    tag: undefined,
};

const tagReducer = createReducer(
    initialState,
    on(TagActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(TagActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(TagActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(TagActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(TagActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TagActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(TagActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(TagActions.getSuccess, (state, { tag }) => {
        return {
            ...state,
            tag,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(TagActions.createSuccess, (state, { tag }) => {
        return {
            ...state,
            tag,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(TagActions.updateSuccess, (state, { tag }) => {
        return {
            ...state,
            tag,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default tagReducer;

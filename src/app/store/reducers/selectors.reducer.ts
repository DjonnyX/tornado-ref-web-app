import { createReducer, on } from '@ngrx/store';
import { ISelectorsState } from '@store/state';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ISelector } from '@djonnyx/tornado-types';

export const initialState: ISelectorsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const selectorsReducer = createReducer(
    initialState,
    on(SelectorsActions.clear, state => {
        return {
            ...initialState
        };
    }),
    on(SelectorsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(SelectorsActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(SelectorsActions.updateRequest, SelectorsActions.repositionRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(SelectorsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(SelectorsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SelectorsActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SelectorsActions.updateError, SelectorsActions.repositionError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SelectorsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(SelectorsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(SelectorsActions.createSuccess, (state, { selector, meta }) => {
        return {
            ...state,
            collection: [...state.collection, selector],
            meta,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(SelectorsActions.updateSuccess, (state, { selector, meta }) => {
        const existsSelectorIndex = state.collection.findIndex(p => p.id === selector.id);
        let collection = [...state.collection];
        if (existsSelectorIndex > -1) {
            collection.splice(existsSelectorIndex, 1);
            collection.splice(existsSelectorIndex, 0, selector);
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
    on(SelectorsActions.repositionSuccess, (state, { positions, meta }) => {
        const positionsDictionary: { [id: string]: number } = {};
        positions?.forEach(pos => {
            positionsDictionary[pos.id] = pos.position;
        });
        const collection = (state.collection || [])
            .map(
                item => {
                    const newItem = { ...item };
                    const pos = positionsDictionary[newItem.id];
                    if (pos !== undefined) {
                        newItem.position = pos;
                    }

                    return newItem;
                }
            );

        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(SelectorsActions.deleteSuccess, (state, { id, meta }) => {
        const existsSelectorIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<ISelector> = [...state.collection];
        if (existsSelectorIndex > -1) {
            collection.splice(existsSelectorIndex, 1);
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

export default selectorsReducer;

import { createReducer, on } from '@ngrx/store';
import { IApplication } from '@djonnyx/tornado-types';
import { ApplicationsActions } from '@store/actions/applications.action';
import { IApplicationsState } from '@store/state/applications.state';

export const initialState: IApplicationsState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    collection: undefined,
};

const applicationsReducer = createReducer(
    initialState,
    on(ApplicationsActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(ApplicationsActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(ApplicationsActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(ApplicationsActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ApplicationsActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(ApplicationsActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isDeleteProcess: false,
            loading: false,
        };
    }),
    on(ApplicationsActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(ApplicationsActions.updateSuccess, (state, { application, meta }) => {
        const existsApplicationIndex = state.collection.findIndex(p => p.id === application.id);
        let collection = [...state.collection];
        if (existsApplicationIndex > -1) {
            collection.splice(existsApplicationIndex, 1);
            collection.splice(existsApplicationIndex, 0, application);
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
    on(ApplicationsActions.deleteSuccess, (state, { id, meta }) => {
        const existsApplicationIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IApplication> = [...state.collection];
        if (existsApplicationIndex > -1) {
            collection.splice(existsApplicationIndex, 1);
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

export default applicationsReducer;

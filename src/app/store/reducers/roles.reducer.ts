import { createReducer, on } from '@ngrx/store';
import { IRole } from '@djonnyx/tornado-types';
import { RolesActions } from '@store/actions/roles.action';
import { IRolesState } from '@store/state/roles.state';

export const initialState: IRolesState = {
    meta: undefined,
    loading: false,
    isGetProcess: false,
    isDeleteProcess: false,
    isUpdateProcess: false,
    error: undefined,
    collection: undefined,
};

const rolesReducer = createReducer(
    initialState,
    on(RolesActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(RolesActions.getAllRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(RolesActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(RolesActions.deleteRequest, state => {
        return {
            ...state,
            isDeleteProcess: true,
            loading: true,
        };
    }),
    on(RolesActions.getAllError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(RolesActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(RolesActions.deleteError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(RolesActions.getAllSuccess, (state, { collection, meta }) => {
        return {
            ...state,
            collection,
            meta,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(RolesActions.updateSuccess, (state, { role, meta }) => {
        const existsRoleIndex = state.collection.findIndex(p => p.id === role.id);
        let collection = [...state.collection];
        if (existsRoleIndex > -1) {
            collection.splice(existsRoleIndex, 1);
            collection.splice(existsRoleIndex, 0, role);
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
    on(RolesActions.deleteSuccess, (state, { id, meta }) => {
        const existsRoleIndex = state.collection.findIndex(p => p.id === id);
        let collection: Array<IRole> = [...state.collection];
        if (existsRoleIndex > -1) {
            collection.splice(existsRoleIndex, 1);
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

export default rolesReducer;

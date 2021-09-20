import { createReducer, on } from '@ngrx/store';
import { IRoleState } from '@store/state';
import { RoleActions } from '@store/actions/role.action';

export const initialState: IRoleState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    role: undefined,
};

const roleReducer = createReducer(
    initialState,
    on(RoleActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(RoleActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(RoleActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(RoleActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(RoleActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(RoleActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(RoleActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(RoleActions.getSuccess, (state, { role }) => {
        return {
            ...state,
            role,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(RoleActions.createSuccess, (state, { role }) => {
        return {
            ...state,
            role,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(RoleActions.updateSuccess, (state, { role }) => {
        return {
            ...state,
            role,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default roleReducer;

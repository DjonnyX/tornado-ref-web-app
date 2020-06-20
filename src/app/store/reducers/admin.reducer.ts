import { createReducer, on } from '@ngrx/store';
import { IAdminState } from '@store/state';
import { AdminActions } from '@store/actions/admin.action';

export const initialState: IAdminState = {
    sidenavHasBackdrop: false,
    sidenavOpened: false,
    currentRoute: ""
};

export const adminReducer = createReducer(
    initialState,
    on(AdminActions.setCurrentRoute, (state, { currentRoute }) => {
        return {
            ...state,
            currentRoute,
        };
    }),
    on(AdminActions.setSideNavOpen, (state, { sidenavOpened }) => {
        return {
            ...state,
            sidenavOpened,
        };
    }),
    on(AdminActions.setSidenavHasBackdrop, (state, { sidenavHasBackdrop }) => {
        return {
            ...state,
            sidenavHasBackdrop,
        };
    }),
);

export default userReducer;

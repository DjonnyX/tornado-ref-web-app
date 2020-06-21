import { createReducer, on } from '@ngrx/store';
import { IAdminState } from '@store/state';
import { AdminActions } from '@store/actions/admin.action';

export const initialState: IAdminState = {
    sidenavHasBackdrop: true,
    sidenavIsOpen: true,
    currentRouteIndex: 0,
};

const adminReducer = createReducer(
    initialState,
    on(AdminActions.setCurrentRouteIndex, (state, { currentRouteIndex }) => {
        return {
            ...state,
            currentRouteIndex,
        };
    }),
    on(AdminActions.setSidenavIsOpen, (state, { sidenavIsOpen }) => {
        return {
            ...state,
            sidenavIsOpen,
        };
    }),
    on(AdminActions.setSidenavHasBackdrop, (state, { sidenavHasBackdrop }) => {
        return {
            ...state,
            sidenavHasBackdrop,
        };
    }),
);

export default adminReducer;

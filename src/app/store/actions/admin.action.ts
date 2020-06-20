import { createAction, props } from "@ngrx/store";

export enum AdminActionTypes {
    SIDENAV_HAS_BACKDROP = "SQUID/admin/sidenav-has-backdrop",
    SIDENAV_OPEN = "SQUID/admin/sidenav-open",
    CURRENT_ROUTE = "SQUID/admin/current-route",
}

export namespace AdminActions {
    export const setSidenavHasBackdrop = createAction(
        AdminActionTypes.SIDENAV_HAS_BACKDROP,
        props<{ sidenavHasBackdrop: boolean }>()
    );
    export const setSideNavOpen = createAction(
        AdminActionTypes.SIDENAV_OPEN,
        props<{ sidenavOpened: boolean }>()
    );
    export const setCurrentRoute = createAction(
        AdminActionTypes.CURRENT_ROUTE,
        props<{ currentRoute: string }>()
    );
}

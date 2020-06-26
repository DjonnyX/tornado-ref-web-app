import { createAction, props } from "@ngrx/store";

export enum CapabilitiesActionTypes {
    RETURN_URL = "TORNADO/capabilities/return-url",
}

export namespace CapabilitiesActions {
    export const setReturnUrl = createAction(
        CapabilitiesActionTypes.RETURN_URL,
        props<{ returnUrl: string }>()
    );
}

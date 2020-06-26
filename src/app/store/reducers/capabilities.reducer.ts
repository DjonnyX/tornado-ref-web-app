import { createReducer, on } from '@ngrx/store';
import { ICapabilitiesState } from '@store/state';
import { CapabilitiesActions } from '@store/actions/capabilities.action';

export const initialState: ICapabilitiesState = {
    returnUrl: undefined,
};

const capabilitiesReducer = createReducer(
    initialState,
    on(CapabilitiesActions.setReturnUrl, (state, { returnUrl }) => {
        return {
            ...state,
            returnUrl,
        };
    }),
);

export default capabilitiesReducer;

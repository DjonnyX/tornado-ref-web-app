import { createReducer, on } from '@ngrx/store';
import { IDocumentationState } from '@store/state';
import { DocumentationActions } from '@store/actions/documentation.action';

export const initialState: IDocumentationState = {
    sidenavIsOpen: false,
    currentRouteIndex: 0,
};

const documentationReducer = createReducer(
    initialState,
    on(DocumentationActions.setCurrentRouteIndex, (state, { currentRouteIndex }) => {
        return {
            ...state,
            currentRouteIndex,
        };
    }),
    on(DocumentationActions.setSidenavOpen, (state, { sidenavIsOpen }) => {
        return {
            ...state,
            sidenavIsOpen,
        };
    }),
);

export default documentationReducer;

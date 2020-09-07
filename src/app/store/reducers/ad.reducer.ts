import { createReducer, on } from '@ngrx/store';
import { IAdState } from '@store/state';
import { AdActions } from '@store/actions/ad.action';
import { deepMergeObjects } from '@app/utils/object.util';

export const initialState: IAdState = {
    loading: false,
    isGetProcess: false,
    isCreateProcess: false,
    isUpdateProcess: false,
    isDeleteProcess: false,
    error: undefined,
    ad: undefined,
};

const adReducer = createReducer(
    initialState,
    on(AdActions.update, (state, { ad }) => {
        return {
            ...initialState,
            ad,
        };
    }),
    on(AdActions.updateResource, (state, { langCode, resourcesType, assetId }) => {
        const ad = deepMergeObjects(state.ad, {
            contents: {
                [langCode]: {
                    resources: {
                        [resourcesType]: assetId,
                    },
                },
            },
        });
        return {
            ...initialState,
            ad,
        };
    }),
    on(AdActions.clear, state => {
        return {
            ...initialState,
        };
    }),
    on(AdActions.getRequest, state => {
        return {
            ...state,
            isGetProcess: true,
            loading: true,
        };
    }),
    on(AdActions.createRequest, state => {
        return {
            ...state,
            isCreateProcess: true,
            loading: true,
        };
    }),
    on(AdActions.updateRequest, state => {
        return {
            ...state,
            isUpdateProcess: true,
            loading: true,
        };
    }),
    on(AdActions.getError, (state, { error }) => {
        return {
            ...state,
            error,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AdActions.createError, (state, { error }) => {
        return {
            ...state,
            error,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AdActions.updateError, (state, { error }) => {
        return {
            ...state,
            error,
            isUpdateProcess: false,
            loading: false,
        };
    }),
    on(AdActions.getSuccess, (state, { ad }) => {
        return {
            ...state,
            ad,
            error: undefined,
            isGetProcess: false,
            loading: false,
        };
    }),
    on(AdActions.createSuccess, (state, { ad }) => {
        return {
            ...state,
            ad,
            error: undefined,
            isCreateProcess: false,
            loading: false,
        };
    }),
    on(AdActions.updateSuccess, (state, { ad }) => {
        return {
            ...state,
            ad,
            error: undefined,
            isUpdateProcess: false,
            loading: false,
        };
    }),
);

export default adReducer;

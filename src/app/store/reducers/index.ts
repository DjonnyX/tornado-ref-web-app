import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';
import { IAppState } from "../state";
import userReducer from './user.reduser';
import adminReducer from './admin.reducer';

const rootReducer: ActionReducerMap<IAppState> = {
  taUser: userReducer,
  taAdmin: adminReducer,
};

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['taUser', 'taAdmin'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export default rootReducer;

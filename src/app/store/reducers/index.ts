import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';
import { IAppState } from "../state";
import userReducer from './user.reduser';
import adminReducer from './admin.reducer';
import capabilitiesReducer from './capabilities.reducer';
import productsReducer from './products.reducer';
import tagsReducer from './tags.reducer';
import selectorsReducer from './selectors.reducer';
import menuNodesReducer from './menu-nodes.reducer';
import productNodesReducer from './product-nodes.reducer';

const rootReducer: ActionReducerMap<IAppState> = {
  taUser: userReducer,
  taAdmin: adminReducer,
  taCapabilities: capabilitiesReducer,
  taProducts: productsReducer,
  taTags: tagsReducer,
  taSelectors: selectorsReducer,
  taMenuNodes: menuNodesReducer,
  taProductNodes: productNodesReducer,
};

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['taUser', 'taAdmin', 'taCapabilities', 'taProducts', 'taTags', 'taSelectors', 'menuNodesReducer', 'productNodesReducer'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export default rootReducer;

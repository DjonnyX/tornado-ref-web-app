import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';
import { IAppState } from "../state";
import userReducer from './user.reduser';
import adminReducer from './admin.reducer';
import capabilitiesReducer from './capabilities.reducer';
import productsReducer from './products.reducer';
import productReducer from './product.reducer';
import productNodesReducer from './product-nodes.reducer';
import productAssetsReducer from './product-assets.reducer';
import tagsReducer from './tags.reducer';
import selectorsReducer from './selectors.reducer';
import menuNodesReducer from './menu-nodes.reducer';
import assetsReducer from './assets.reducer';
import selectorReducer from './selector.reducer';
import tagReducer from './tag.reducer';
import businessPeriodsReducer from './business-periods.reducer';
import businessPeriodReducer from './business-period.reducer';
import selectorAssetsReducer from './selector-assets.reducer';
import currenciesReducer from './currencies.reducer';
import currencyReducer from './currency.reducer';

const rootReducer: ActionReducerMap<IAppState> = {
  taUser: userReducer,
  taAdmin: adminReducer,
  taCapabilities: capabilitiesReducer,
  taProducts: productsReducer,
  taProduct: productReducer,
  taProductNodes: productNodesReducer,
  taProductAssets: productAssetsReducer,
  taTags: tagsReducer,
  taTag: tagReducer,
  taSelectors: selectorsReducer,
  taSelector: selectorReducer,
  taSelectorAssets: selectorAssetsReducer,
  taMenuNodes: menuNodesReducer,
  taAssets: assetsReducer,
  taBusinessPeriods: businessPeriodsReducer,
  taBusinessPeriod: businessPeriodReducer,
  taCurrencies: currenciesReducer,
  taCurrency: currencyReducer,
};

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['taUser', 'taAdmin', 'taCapabilities'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export default rootReducer;

import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';
import { IAppState } from "../state";
import userReducer from './user.reduser';
import adminReducer from './admin.reducer';
import documentationReducer from './documentation.reducer';
import capabilitiesReducer from './capabilities.reducer';
import productsReducer from './products.reducer';
import productReducer from './product.reducer';
import productAssetsReducer from './product-assets.reducer';
import tagReducer from './tag.reducer';
import tagsReducer from './tags.reducer';
import appThemeReducer from './app-theme.reducer';
import appThemesReducer from './app-themes.reducer';
import selectorsReducer from './selectors.reducer';
import menuNodesReducer from './menu-nodes.reducer';
import assetsReducer from './assets.reducer';
import selectorReducer from './selector.reducer';
import businessPeriodsReducer from './business-periods.reducer';
import businessPeriodReducer from './business-period.reducer';
import selectorAssetsReducer from './selector-assets.reducer';
import currenciesReducer from './currencies.reducer';
import currencyReducer from './currency.reducer';
import orderTypeReducer from './order-type.reducer';
import orderTypesReducer from './order-types.reducer';
import orderTypeAssetsReducer from './order-type-assets.reducer';
import languageAssetsReducer from './language-assets.reducer';
import languageReducer from './language.reducer';
import languagesReducer from './languages.reducer';
import translationReducer from './translation.reducer';
import tagAssetsReducer from './tag-assets.reducer';
import adsReducer from './ads.reducer';
import adAssetsReducer from './ad-assets.reducer';
import adReducer from './ad.reducer';
import storeReducer from './store.reducer';
import storesReducer from './stores.reducer';
import terminalReducer from './terminal.reducer';
import terminalsReducer from './terminals.reducer';
import licenseReducer from './license.reducer';
import licensesReducer from './licenses.reducer';
import licenseAccountReducer from './license-account.reducer';
import licensesAccountReducer from './licenses-account.reducer';
import applicationReducer from './application.reducer';
import applicationsReducer from './applications.reducer';
import tarifReducer from './tarif.reducer';
import tarifsReducer from './tarifs.reducer';
import integrationReducer from "./integration.reducer";
import integrationsReducer from "./integrations.reducer";
import accountsReducer from "./accounts.reducer";
import accountReducer from "./account.reducer";
import checkuesReducer from "./checkues.reducer";
import checkueReducer from "./checkue.reducer";
import appThemeAssetsReducer from "./app-theme-assets.reducer";
import systemTagReducer from "./system-tag.reducer";
import systemTagsReducer from "./system-tags.reducer";
import settingsReducer from "./settings.reducer";
import integrationServerInfoReducer from "./integration-server-info.reducer";
import refServerInfoReducer from "./ref-server-info.reducer";
import rolesReducer from "./roles.reducer";
import roleReducer from "./role.reducer";
import subscriptionReducer from "./subscription.reducer";
import subscriptionsReducer from "./subscriptions.reducer";
import weightUnitReducer from "./weight-unit.reducer";
import weightUnitsReducer from "./weight-units.reducer";

const rootReducer: ActionReducerMap<IAppState> = {
  taUser: userReducer,
  taAdmin: adminReducer,
  taDocumentation: documentationReducer,
  taCapabilities: capabilitiesReducer,
  taProducts: productsReducer,
  taProduct: productReducer,
  taProductAssets: productAssetsReducer,
  taTags: tagsReducer,
  taTag: tagReducer,
  taThemeAssets: appThemeAssetsReducer,
  taTheme: appThemeReducer,
  taThemes: appThemesReducer,
  taTagAssets: tagAssetsReducer,
  taSelectors: selectorsReducer,
  taSelector: selectorReducer,
  taSelectorAssets: selectorAssetsReducer,
  taMenuNodes: menuNodesReducer,
  taAssets: assetsReducer,
  taBusinessPeriods: businessPeriodsReducer,
  taBusinessPeriod: businessPeriodReducer,
  taCurrencies: currenciesReducer,
  taCurrency: currencyReducer,
  taOrderType: orderTypeReducer,
  taOrderTypes: orderTypesReducer,
  taOrderTypeAssets: orderTypeAssetsReducer,
  taLanguage: languageReducer,
  taLanguages: languagesReducer,
  taLanguageAssets: languageAssetsReducer,
  taTranslation: translationReducer,
  taAd: adReducer,
  taAds: adsReducer,
  taAdAssets: adAssetsReducer,
  taStore: storeReducer,
  taStores: storesReducer,
  taTerminal: terminalReducer,
  taTerminals: terminalsReducer,
  taLicense: licenseReducer,
  taLicenses: licensesReducer,
  taLicenseAccount: licenseAccountReducer,
  taLicensesAccount: licensesAccountReducer,
  taApplication: applicationReducer,
  taApplications: applicationsReducer,
  taTarif: tarifReducer,
  taTarifs: tarifsReducer,
  taIntegration: integrationReducer,
  taIntegrations: integrationsReducer,
  taCheckues: checkuesReducer,
  taCheckue: checkueReducer,
  taAccounts: accountsReducer,
  taAccount: accountReducer,
  taRoles: rolesReducer,
  taRole: roleReducer,
  taSystemTag: systemTagReducer,
  taSystemTags: systemTagsReducer,
  taSettings: settingsReducer,
  taIntegrationServerInfo: integrationServerInfoReducer,
  taRefServerInfo: refServerInfoReducer,
  taSubscription: subscriptionReducer,
  taSubscriptions: subscriptionsReducer,
  taWeightUnit: weightUnitReducer,
  taWeightUnits: weightUnitsReducer,
};

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['taUser', 'taAdmin', 'documentationReducer', 'taCapabilities', 'taSettings'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export default rootReducer;

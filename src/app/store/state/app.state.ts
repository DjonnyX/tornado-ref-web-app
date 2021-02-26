import { IUserState } from './user.state';
import { IAdminState } from './admin.state';
import { ICapabilitiesState } from './capabilities.state';
import { IProductsState } from './products.state';
import { IProductState } from './product.state';
import { IProductAssetsState } from './product-assets.state';
import { IProductNodesState } from './product-nodes.state';
import { ITagsState } from './tags.state';
import { ISelectorsState } from './selectors.state';
import { IMenuNodesState } from './menu-nodes.state';
import { IAssetsState } from './assets.state';
import { ISelectorState } from './selector.state';
import { ITagState } from './tag.state';
import { IBusinessPeriodsState } from './bisiness-periods.state';
import { IBusinessPeriodState } from './business-period.state';
import { ISelectorAssetsState } from './selector-assets.state';
import { ICurrenciesState } from './currencies.state';
import { ICurrencyState } from './currency.state';
import { IOrderTypesState } from './order-types.state';
import { IOrderTypeState } from './order-type.state';
import { IOrderTypeAssetsState } from './order-type-assets.state';
import { ILanguagesState } from './languages.state';
import { ILanguageState } from './language.state';
import { ILanguageAssetsState } from './language-assets.state';
import { ITranslationState } from './translation.state';
import { ITagAssetsState } from './tag-assets.state';
import { IAdState } from './ad.state';
import { IAdsState } from './ads.state';
import { IAdAssetsState } from './ad-assets.state';
import { IStoreState } from './store.state';
import { IStoresState } from './stores.state';
import { ITerminalState } from './terminal.state';
import { ITerminalsState } from './terminals.state';
import { ILicenseState } from './license.state';
import { ILicensesState } from './licenses.state';
import { ILicenseTypeState } from './license-type.state';
import { ILicenseTypesState } from './license-types.state';
import { IApplicationState } from './application.state';
import { IApplicationsState } from './applications.state';
import { IIntegrationState } from './integration.state';
import { IIntegrationsState } from './integrations.state';
import { IAccountsState } from './accounts.state';
import { ILicenseAccountState } from './license-account.state';
import { ILicensesAccountState } from './licenses-account.state';
import { ICheckueState } from './checkue.state';
import { ICheckuesState } from './checkues.state';

export interface IAppState {
    taUser: IUserState;
    taAdmin: IAdminState;
    taCapabilities: ICapabilitiesState;
    taProducts: IProductsState;
    taProduct: IProductState;
    taProductNodes: IProductNodesState,
    taProductAssets: IProductAssetsState,
    taTags: ITagsState;
    taTag: ITagState;
    taTagAssets: ITagAssetsState,
    taSelectors: ISelectorsState,
    taSelector: ISelectorState,
    taSelectorAssets: ISelectorAssetsState,
    taMenuNodes: IMenuNodesState,
    taAssets: IAssetsState,
    taBusinessPeriods: IBusinessPeriodsState,
    taBusinessPeriod: IBusinessPeriodState,
    taCurrencies: ICurrenciesState,
    taCurrency: ICurrencyState,
    taOrderTypes: IOrderTypesState,
    taOrderType: IOrderTypeState,
    taOrderTypeAssets: IOrderTypeAssetsState,
    taLanguages: ILanguagesState,
    taLanguage: ILanguageState,
    taLanguageAssets: ILanguageAssetsState,
    taTranslation: ITranslationState,
    taAd: IAdState,
    taAds: IAdsState,
    taAdAssets: IAdAssetsState,
    taStore: IStoreState,
    taStores: IStoresState,
    taTerminal: ITerminalState,
    taTerminals: ITerminalsState,
    taLicense: ILicenseState,
    taLicenses: ILicensesState,
    taLicenseAccount: ILicenseAccountState,
    taLicensesAccount: ILicensesAccountState,
    taLicenseType: ILicenseTypeState,
    taLicenseTypes: ILicenseTypesState,
    taApplication: IApplicationState,
    taApplications: IApplicationsState,
    taIntegration: IIntegrationState,
    taIntegrations: IIntegrationsState,
    taAccounts: IAccountsState,
    taCheckue: ICheckueState,
    taCheckues: ICheckuesState,
}
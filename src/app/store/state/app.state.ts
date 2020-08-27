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
}
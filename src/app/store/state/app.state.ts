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

export interface IAppState {
    taUser: IUserState;
    taAdmin: IAdminState;
    taCapabilities: ICapabilitiesState;
    taProducts: IProductsState;
    taProduct: IProductState;
    taProductNodes: IProductNodesState,
    taProductAssets: IProductAssetsState,
    taTags: ITagsState;
    taSelectors: ISelectorsState,
    taMenuNodes: IMenuNodesState,
    taAssets: IAssetsState,
}
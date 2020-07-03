import { IUserState } from './user.state';
import { IAdminState } from './admin.state';
import { ICapabilitiesState } from './capabilities.state';
import { IProductsState } from './products.state';
import { ITagsState } from './tags.state';
import { ISelectorsState } from '.';
import { IMenuNodesState } from './menu-nodes.state';

export interface IAppState {
    taUser: IUserState;
    taAdmin: IAdminState;
    taCapabilities: ICapabilitiesState;
    taProducts: IProductsState;
    taTags: ITagsState;
    taSelectors: ISelectorsState,
    taMenuNodes: IMenuNodesState,
}
import { IUserState } from './user.state';
import { IAdminState } from './admin.state';
import { ICapabilitiesState } from './capabilities.state';
import { IProductsState } from './products.state';
import { ITagsState } from './tags.state';

export interface IAppState {
    taUser: IUserState;
    taAdmin: IAdminState;
    taCapabilities: ICapabilitiesState;
    taProducts: IProductsState;
    taTags: ITagsState;
}
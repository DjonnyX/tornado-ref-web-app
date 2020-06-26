import { IUserState } from './user.state';
import { IAdminState } from './admin.state';

export interface IAppState {
    taUser: IUserState;
    taAdmin: IAdminState;
}
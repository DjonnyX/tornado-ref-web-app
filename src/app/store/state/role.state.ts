import { IBaseState } from './base';
import { IRole } from '@djonnyx/tornado-types';

export interface IRoleState extends IBaseState {
    role: IRole;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IRole } from '@djonnyx/tornado-types';

export interface IRolesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IRole> | null;
}
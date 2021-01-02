import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IApplication } from '@djonnyx/tornado-types';

export interface IApplicationsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IApplication> | null;
}
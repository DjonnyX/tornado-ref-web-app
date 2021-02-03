import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IIntegration } from '@djonnyx/tornado-types';

export interface IIntegrationsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    // isDeleteProcess: boolean;
    collection: Array<IIntegration> | null;
}
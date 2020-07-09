import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@models';

export interface IAssetsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IAsset> | null;
}
import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IAsset } from '@models';

export interface ISelectorAssetsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: {[lang: string]: Array<IAsset> | null};
}
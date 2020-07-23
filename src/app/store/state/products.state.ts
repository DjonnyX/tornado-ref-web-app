import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IProduct } from '@djonnyx/tornado-types';

export interface IProductsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IProduct> | null;
}
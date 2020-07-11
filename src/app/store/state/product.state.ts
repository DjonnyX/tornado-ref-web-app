import { IBaseState } from './base';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from '@services';

export interface IProductState extends IBaseState {
    product: IProduct;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
import { IBaseState } from './base';
import { IProduct } from '@app/models/product.model';

export interface IProductState extends IBaseState {
    product: IProduct;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
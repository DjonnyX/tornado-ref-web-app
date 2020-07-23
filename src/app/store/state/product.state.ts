import { IBaseState } from './base';
import { IProduct } from '@djonnyx/tornado-types';

export interface IProductState extends IBaseState {
    product: IProduct;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
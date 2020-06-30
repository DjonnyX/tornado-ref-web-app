import { IBaseState } from './base';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from '@services';

export interface IProductsState extends IBaseState {
    ref: IMetaRefsResponse;
    collection: Array<IProduct>;
}
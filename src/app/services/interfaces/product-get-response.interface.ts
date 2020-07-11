import { IBaseResponse } from './base-response.interface';
import { IProduct } from '@app/models/product.model';

export interface IProductGetResponse extends IBaseResponse<IProduct, {}> {}
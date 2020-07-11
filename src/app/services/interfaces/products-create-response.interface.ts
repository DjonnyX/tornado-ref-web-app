import { IBaseResponse } from './base-response.interface';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IProductsCreateResponse extends IBaseResponse<IProduct, IMetaRefsResponse> {}
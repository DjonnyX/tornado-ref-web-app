import { IBaseResponse } from '.';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IProductsUpdateResponse extends IBaseResponse<IProduct, IMetaRefsResponse> {}
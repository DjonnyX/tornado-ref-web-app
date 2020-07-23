import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IProduct } from '@djonnyx/tornado-types';

export interface IProductsUpdateResponse extends IBaseResponse<IProduct, IMetaRefsResponse> {}
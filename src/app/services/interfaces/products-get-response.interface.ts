import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IProduct } from '@djonnyx/tornado-types';

export interface IProductsGetResponse extends IBaseResponse<Array<IProduct>, IMetaRefsResponse> {}
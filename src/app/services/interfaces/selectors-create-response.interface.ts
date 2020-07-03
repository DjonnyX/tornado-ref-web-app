import { IBaseResponse } from '.';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface ISelectorsCreateResponse extends IBaseResponse<IProduct, IMetaRefsResponse> {}
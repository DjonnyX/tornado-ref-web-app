import { IBaseResponse } from './base-response.interface';
import { IProduct } from '@djonnyx/tornado-types';

export interface IProductGetResponse extends IBaseResponse<IProduct, {}> {}
import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IStore } from '@djonnyx/tornado-types';

export interface IStoreUpdateResponse extends IBaseResponse<IStore, IMetaRefsResponse> {}
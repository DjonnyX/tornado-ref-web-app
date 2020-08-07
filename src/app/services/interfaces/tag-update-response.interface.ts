import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ITag } from '@djonnyx/tornado-types';

export interface ITagUpdateResponse extends IBaseResponse<ITag, IMetaRefsResponse> {}
import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ITag } from '@models';

export interface ITagsCreateResponse extends IBaseResponse<ITag, IMetaRefsResponse> {}
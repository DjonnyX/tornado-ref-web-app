import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ITerminal } from '@djonnyx/tornado-types';

export interface ITerminalsGetResponse extends IBaseResponse<Array<ITerminal>, IMetaRefsResponse> {}
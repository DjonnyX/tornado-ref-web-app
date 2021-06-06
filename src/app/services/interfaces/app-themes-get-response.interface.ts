import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAppTheme } from '@djonnyx/tornado-types';

export interface IAppThemesGetResponse<T = any> extends IBaseResponse<Array<IAppTheme<T>>, IMetaRefsResponse> {}
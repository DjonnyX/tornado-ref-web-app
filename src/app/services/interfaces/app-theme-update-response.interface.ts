import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAppTheme } from '@djonnyx/tornado-types';

export interface IAppThemeUpdateResponse<T = any> extends IBaseResponse<IAppTheme<T>, IMetaRefsResponse> {}
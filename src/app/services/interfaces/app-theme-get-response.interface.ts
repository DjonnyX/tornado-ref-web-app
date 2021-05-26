import { IBaseResponse } from './base-response.interface';
import { IAppTheme } from '@djonnyx/tornado-types';

export interface IAppThemeGetResponse<T = any> extends IBaseResponse<IAppTheme<T>, {}> {}
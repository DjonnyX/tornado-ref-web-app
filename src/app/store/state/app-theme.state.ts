import { IBaseState } from './base';
import { IAppTheme } from '@djonnyx/tornado-types';

export interface IAppThemeState<T = any> extends IBaseState {
    theme: IAppTheme<T>;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
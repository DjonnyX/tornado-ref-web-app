import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IAppTheme } from '@djonnyx/tornado-types';

export interface IAppThemesState<T = any> extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IAppTheme<T>> | null;
}
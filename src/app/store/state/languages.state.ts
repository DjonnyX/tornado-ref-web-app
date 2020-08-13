import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ILanguage } from '@djonnyx/tornado-types';

export interface ILanguagesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ILanguage> | null;
}
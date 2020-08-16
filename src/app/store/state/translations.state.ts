import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ITranslation } from '@djonnyx/tornado-types';

export interface ITranslationsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    collection: Array<ITranslation> | null;
}
import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ITarif } from '@djonnyx/tornado-types';

export interface ITarifsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ITarif> | null;
}
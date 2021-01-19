import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ILicense } from '@djonnyx/tornado-types';

export interface ILicensesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    /*isUpdateProcess: boolean;
    isDeleteProcess: boolean;*/
    collection: Array<ILicense> | null;
}
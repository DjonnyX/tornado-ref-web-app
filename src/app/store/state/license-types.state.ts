import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ILicenseType } from '@djonnyx/tornado-types';

export interface ILicenseTypesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ILicenseType> | null;
}
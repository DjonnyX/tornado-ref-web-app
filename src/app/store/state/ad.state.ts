import { IBaseState } from './base';
import { IAd } from '@djonnyx/tornado-types';

export interface IAdState extends IBaseState {
    ad: IAd;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
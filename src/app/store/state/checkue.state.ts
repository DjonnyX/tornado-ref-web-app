import { IBaseState } from './base';
import { ICheckue } from '@djonnyx/tornado-types';

export interface ICheckueState extends IBaseState {
    checkue: ICheckue;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
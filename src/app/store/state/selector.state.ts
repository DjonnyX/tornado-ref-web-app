import { IBaseState } from './base';
import { ISelector } from '@djonnyx/tornado-types';

export interface ISelectorState extends IBaseState {
    selector: ISelector;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
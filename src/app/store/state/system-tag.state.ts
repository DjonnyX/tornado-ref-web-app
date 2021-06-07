import { IBaseState } from './base';
import { ISystemTag } from '@djonnyx/tornado-types';

export interface ISystemTagState extends IBaseState {
    systemTag: ISystemTag;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
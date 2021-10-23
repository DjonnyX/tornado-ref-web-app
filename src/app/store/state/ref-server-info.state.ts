import { IBaseState } from './base';
import { IRefServerInfo } from '@djonnyx/tornado-types';

export interface IRefServerInfoState extends IBaseState {
    info: IRefServerInfo;
    isGetProcess: boolean;
}
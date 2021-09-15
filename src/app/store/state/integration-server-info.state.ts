import { IBaseState } from './base';
import { IIntegrationServerInfo } from '@djonnyx/tornado-types';

export interface IIntegrationServerInfoState extends IBaseState {
    info: IIntegrationServerInfo;
    isGetProcess: boolean;
}
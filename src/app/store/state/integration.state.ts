import { IBaseState } from './base';
import { IIntegration } from '@djonnyx/tornado-types';

export interface IIntegrationState extends IBaseState {
    integration: IIntegration;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
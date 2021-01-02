import { IBaseState } from './base';
import { IApplication } from '@djonnyx/tornado-types';

export interface IApplicationState extends IBaseState {
    application: IApplication;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
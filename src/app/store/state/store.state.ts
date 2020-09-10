import { IBaseState } from './base';
import { IStore } from '@djonnyx/tornado-types';

export interface IStoreState extends IBaseState {
    store: IStore;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
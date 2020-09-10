import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ITerminal } from '@djonnyx/tornado-types';

export interface ITerminalsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ITerminal> | null;
}
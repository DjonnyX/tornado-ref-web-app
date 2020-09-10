import { IBaseState } from './base';
import { ITerminal } from '@djonnyx/tornado-types';

export interface ITerminalState extends IBaseState {
    terminal: ITerminal;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
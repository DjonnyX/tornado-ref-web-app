import { IBaseState } from './base';
import { ITarif } from '@djonnyx/tornado-types';

export interface ITarifState extends IBaseState {
    tarif: ITarif;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
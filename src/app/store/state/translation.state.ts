import { IBaseState } from './base';
import { ITranslation } from '@djonnyx/tornado-types';

export interface ITranslationState extends IBaseState {
    translation: ITranslation;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
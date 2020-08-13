import { IBaseState } from './base';
import { ILanguage } from '@djonnyx/tornado-types';

export interface ILanguageState extends IBaseState {
    language: ILanguage;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}
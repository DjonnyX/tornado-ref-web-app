import { IAccount } from '@djonnyx/tornado-types';
import { ICaptcha } from '@models';
import { IBaseResponse } from './base-response.interface';

export interface IAccountCreateParamsResponse extends IBaseResponse<{
    captcha: ICaptcha;
}, {}> {}

export interface IAccountCreateResponse extends IBaseResponse<IAccount, {}> {}
import { ICaptcha } from '@models';
import { IBaseResponse } from './base-response.interface';

export interface IUserSignupParamsResponse extends IBaseResponse<{
    captcha: ICaptcha;
}, {}> {}

export interface IUserSignupResponse extends IBaseResponse<{}, {}> {}
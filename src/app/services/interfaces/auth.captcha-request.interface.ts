import { ICaptcha } from '@models';
import { IBaseResponse } from './base-response.interface';

export interface IAuthCaptchaResponse extends IBaseResponse<ICaptcha, {}> {}
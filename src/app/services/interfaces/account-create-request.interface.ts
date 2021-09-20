export interface IAccountCreateRequest {
    captchaId: string;
    captchaValue: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IAccountCreateParamsRequest {
    [x: string]: any;
}
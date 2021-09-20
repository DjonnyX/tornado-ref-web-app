export interface IAccountCreateRequest {
    captchaId: string;
    captchaValue: string;
    roleType: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IAccountCreateParamsRequest {
    [x: string]: any;
}
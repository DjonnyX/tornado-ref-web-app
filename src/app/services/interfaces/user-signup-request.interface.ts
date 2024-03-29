export interface IUserSignupRequest {
    integrationId: string;
    captchaId: string;
    captchaValue: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserSignupParamsRequest {
    [x: string]: any;
}
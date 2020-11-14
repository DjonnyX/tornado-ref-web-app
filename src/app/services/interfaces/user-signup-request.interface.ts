export interface IUserSignupRequest {
    captchaId: string;
    captchaValue: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserSignupParamsRequest { }
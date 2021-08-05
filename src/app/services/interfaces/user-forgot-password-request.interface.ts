export interface IUserForgotPasswordRequest {
    email: string;
    captchaId: string;
    captchaVal: string;
    language: string;
}
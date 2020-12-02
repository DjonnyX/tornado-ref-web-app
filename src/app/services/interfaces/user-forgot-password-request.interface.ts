export interface IUserForgotPasswordRequest {
    email: string;
    captchaId: string;
    captchaVal: string;
}
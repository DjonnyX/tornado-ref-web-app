export interface IUserChangeEmailRequest {
    email: string;
    captchaId: string;
    captchaVal: string;
    language: string;
}
export interface IUserProfile {
    account: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        integrationId: string;
    },
    role: string;
    token: string;
}
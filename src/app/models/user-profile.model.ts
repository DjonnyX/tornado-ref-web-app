export interface IUserProfile {
    account: {
        email: string;
        lastName: string;
        patronymicName: string;
        phone: string;
        position: string;
        name: string;
        language: string;
    },
    token: string;
    rights: [
        {
            obj: string;
            action: string;
        }
    ]
}
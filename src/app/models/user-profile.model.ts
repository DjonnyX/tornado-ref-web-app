import { UserRights } from "@djonnyx/tornado-types"; 

export interface IUserProfile {
    account: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        integrationId: string;
        rights: Array<UserRights>;
    },
    role: string;
    token: string;
}
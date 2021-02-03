import { IAccount } from '@djonnyx/tornado-types';

export const formatAccountModel = (model: IAccount): IAccount => {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
    }
}
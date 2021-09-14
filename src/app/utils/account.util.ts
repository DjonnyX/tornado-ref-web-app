import { IAccount } from '@djonnyx/tornado-types';

export const formatAccountModel = (model: IAccount): IAccount => {
    return {
        owner: model.owner,
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
    }
}
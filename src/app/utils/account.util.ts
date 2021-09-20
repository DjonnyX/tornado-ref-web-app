import { IAccount } from '@djonnyx/tornado-types';

export const formatAccountModel = (model: IAccount): IAccount => {
    return {
        owner: model.owner,
        roleType: model.roleType,
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
    }
}
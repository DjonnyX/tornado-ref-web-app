import { ILicenseType } from '@djonnyx/tornado-types';

export const formatLicenseTypeModel = (model: ILicenseType) => {
    return {
        name: model.name,
        description: model.description,
        price: model.price,
        payNotice: model.payNotice,
        integrationId: model.integrationId,
    }
}
import { ILicenseType } from '@djonnyx/tornado-types';

export const formatLicenseTypeModel = (model: ILicenseType) => {
    return {
        applicationId: model.applicationId,
        integrationId: model.integrationId,
        name: model.name,
        description: model.description,
        price: model.price,
        payNotice: model.payNotice,
        extra: model.extra,
    }
}
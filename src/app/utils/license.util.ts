import { ILicense } from '@djonnyx/tornado-types';
import { formatLicenseTypeModel } from './license-type.util';

export const formatLicenseModel = (model: ILicense) => {
    return {
        id: model.id,
        integrationSubscriptionId: model.integrationSubscriptionId,
        integrationUser: model.integrationUser,
        clientId: model.clientId,
        dateStart: model.dateStart,
        dateEnd: model.dateEnd,
        status: model.status,
        key: model.key,
        state: model.state,
        licTypeId: model.licTypeId,
        licType: formatLicenseTypeModel(model.licType),
        lastUpdate: model.lastUpdate,
    }
}
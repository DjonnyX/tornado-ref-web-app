import { ILicenseType } from '@djonnyx/tornado-types';

export const formatLicenseTypeModel = (model: ILicenseType) => {
    return {
        userId: model.userId,
        dateStart: model.dateStart,
        dateEnd: model.dateEnd,
        status: model.status,
        key: model.key,
        state: model.state,
        licTypeId: model.licTypeId,
        lastUpdate: model.lastUpdate,
        extra: model.extra,
    }
}
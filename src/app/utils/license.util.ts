import { ILicense } from '@djonnyx/tornado-types';

export const formatLicenseModel = (model: ILicense) => {
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
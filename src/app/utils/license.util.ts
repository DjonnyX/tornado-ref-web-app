import { ILicense } from '@djonnyx/tornado-types';

export const formatLicenseModel = (model: ILicense): ILicense => {
    return {
        clientId: model.clientId,
        dateStart: model.dateStart,
        dateEnd: model.dateEnd,
        status: model.status,
        state: model.state,
        licTypeId: model.licTypeId,
        // without imei && && key md5key && licType && lastUpdate
    } as any;
}
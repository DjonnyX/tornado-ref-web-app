import { ILicense } from '@djonnyx/tornado-types';

export const formatLicenseModel = (model: ILicense): ILicense => {
    return {
        client: model.client,
        dateStart: model.dateStart,
        dateEnd: model.dateEnd,
        state: model.state,
        licTypeId: model.licTypeId,
        // without imei && && key md5key && licType && lastUpdate
    } as any;
}
import { ILicense } from '@djonnyx/tornado-types';

export const formatLicenseModel = (model: ILicense): ILicense => {
    return {
        client: model.client,
        subscriptionId: model.subscriptionId,
        // without imei && && key md5key && licType && lastUpdate
    } as any;
}
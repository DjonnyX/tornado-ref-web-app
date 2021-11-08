import { ISubscription } from '@djonnyx/tornado-types';

export const formatSubscriptionModel = (model: ISubscription): ISubscription => {
    return {
        client: model.client,
        tarifId: model.tarifId,
        devices: model.devices,
        status: model.status,
        extra: model.extra,
    } as unknown as ISubscription
}
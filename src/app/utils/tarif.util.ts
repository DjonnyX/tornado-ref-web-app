import { ITarif } from '@djonnyx/tornado-types';

export const formatTarifModel = (model: ITarif): ITarif => {
    return {
        applicationId: model.applicationId,
        serviceId: model.serviceId,
        name: model.name,
        description: model.description,
        trialPeriodDuration: model.trialPeriodDuration,
        paymentPeriod: model.paymentPeriod,
        costByDevices: model.costByDevices,
        extra: model.extra,
    } as ITarif
}
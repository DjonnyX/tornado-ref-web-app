import { ITarif, ITarifDiscountByDevices } from '@djonnyx/tornado-types';

export const formatTarifModel = (model: ITarif): ITarif => {
    return {
        applicationId: model.applicationId,
        integrationId: model.integrationId,
        serviceId: model.serviceId,
        name: model.name,
        description: model.description,
        trialPeriodDuration: model.trialPeriodDuration,
        paymentPeriod: model.paymentPeriod,
        costByDevices: model.costByDevices,
        extra: model.extra,
    }
}

export const formatTarifCostByDevices = (prices: Array<ITarifDiscountByDevices>): string => {
    return prices?.map(v => `${(v.cost * 0.01).toFixed(2)} за ${v.largeOrEqual} и более устройств; `).join("; ");
}
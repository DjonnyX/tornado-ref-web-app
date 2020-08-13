import { IBusinessPeriod } from '@djonnyx/tornado-types';

export const formatBusinessPeriodModel = (model: IBusinessPeriod) => {
    return {
        active: model.active,
        name: model.name,
        description: model.description,
        schedule: model.schedule,
        extra: model.extra,
    }
}
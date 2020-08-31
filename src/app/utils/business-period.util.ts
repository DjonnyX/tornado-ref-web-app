import { IBusinessPeriod } from '@djonnyx/tornado-types';

export const formatBusinessPeriodModel = (model: IBusinessPeriod) => {
    return {
        active: model.active,
        contents: model.contents,
        schedule: model.schedule,
        extra: model.extra,
    }
}
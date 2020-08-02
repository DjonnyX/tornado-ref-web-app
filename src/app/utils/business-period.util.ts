import { IBusinessPeriod } from '@djonnyx/tornado-types';

export const formatBusinessPeriodModel = (businessPeriod: IBusinessPeriod) => {
    return {
        active: businessPeriod.active,
        name: businessPeriod.name,
        description: businessPeriod.description,
        schedule: businessPeriod.schedule,
        extra: businessPeriod.extra,
    }
}
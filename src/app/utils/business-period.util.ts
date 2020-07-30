import { IBusinessPeriod } from '@djonnyx/tornado-types';

export const formatBusinessPeriodModel = (businessPeriod: IBusinessPeriod) => {
    return {
        name: businessPeriod.name,
        description: businessPeriod.description,
        schedule: businessPeriod.schedule,
    }
}
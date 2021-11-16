import { IWeightUnit } from '@djonnyx/tornado-types';

export const formatWeightUnitModel = (model: IWeightUnit) => {
    return {
        systemName: model.systemName,
        contents: model.contents,
        extra: model.extra,
    }
}
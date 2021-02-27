import { ICheckue } from '@djonnyx/tornado-types';

export const formatCheckueModel = (model: ICheckue) => {
    return {
        active: model.active,
        name: model.name,
        scenarios: model.scenarios,
        extra: model.extra,
    }
}
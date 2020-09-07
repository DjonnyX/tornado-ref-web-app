import { IAd } from '@djonnyx/tornado-types';

export const formatAdModel = (model: IAd) => ({
    active: model.active,
    type: model.type,
    name: model.name,
    contents: model.contents,
    extra: model.extra,
});
import { IAd } from '@djonnyx/tornado-types';

export const formatAdModel = (model: IAd) => ({
    active: model.active,
    name: model.name,
    contents: model.contents,
    extra: model.extra,
});
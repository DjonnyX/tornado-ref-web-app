import { ISystemTag } from '@djonnyx/tornado-types';

export const formatSystemTagModel = (model: ISystemTag) => ({
    name: model.name,
    position: model.position,
    extra: model.extra,
});
import { ISystemTag } from '@djonnyx/tornado-types';

export const formatSystemTagModel = (model: ISystemTag) => ({
    name: model.name,
    extra: model.extra,
});
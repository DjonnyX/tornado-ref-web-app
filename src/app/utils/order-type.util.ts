import { IOrderType } from '@djonnyx/tornado-types';

export const formatOrderTypeModel = (model: IOrderType) => {
    return {
        isDefault: model.isDefault,
        active: model.active,
        contents: model.contents,
        extra: model.extra,
    };
};
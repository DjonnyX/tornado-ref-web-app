import { IProduct } from '@djonnyx/tornado-types';

export const formatProductModel = (model: IProduct) => ({
    active: model.active,
    position: model.position,
    contents: model.contents,
    prices: model.prices.map(price => ({
        currency: price.currency,
        value: price.value,
    })),
    receipt: model.receipt,
    tags: model.tags,
    weight: model.weight,
    weightUnitId: model.weightUnitId,
    systemTag: model.systemTag,
    joint: model.joint,
    extra: model.extra,
});
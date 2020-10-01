import { ICurrency } from '@djonnyx/tornado-types';

export const formatCurrencyModel = (model: ICurrency) => {
    return {
        isDefault: model.isDefault,
        active: model.active,
        code: model.code,
        name: model.name,
        symbol: model.symbol,
    }
}
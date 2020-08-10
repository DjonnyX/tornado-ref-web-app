import { ICurrency } from '@djonnyx/tornado-types';

export const formatCurrencyModel = (model: ICurrency) => {
    return {
        code: model.code,
        name: model.name,
        symbol: model.symbol,
    }
}
import { ICurrency } from '@djonnyx/tornado-types';

export const formatCurrencyModel = (currency: ICurrency) => {
    return {
        code: currency.code,
        name: currency.name,
        symbol: currency.symbol,
    }
}
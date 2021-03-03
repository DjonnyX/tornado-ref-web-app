import {
  ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes,
  ScenarioSelectorActionTypes, ScenarioProgrammActionTypes, ScenarioPriceActionTypes
} from '@djonnyx/tornado-types';

export const getScenarioTypeName = (type: ScenarioProgrammActionTypes | ScenarioCommonActionTypes |
  ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes | ScenarioPriceActionTypes): string => {
  switch (type) {
    case ScenarioProgrammActionTypes.SWITCH:
      return "Условие";
    case ScenarioProgrammActionTypes.EXPRESSION:
      return "Выражение";
    case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
      return "Доступность по Бизнес-периодам";
    case ScenarioCommonActionTypes.VISIBLE_BY_STORE:
      return "Доступность по магазинам";
    case ScenarioCommonActionTypes.VISIBLE_BY_TERMINAL:
      return "Доступность по терминалам";
    case ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE:
      return "Доступность по типам заказа";
    case ScenarioIntroActionTypes.DURATION:
      return "Продолжительность (мс)";
    case ScenarioProductActionTypes.DOWN_LIMIT:
      return "Нижний предел";
    case ScenarioProductActionTypes.UP_LIMIT:
      return "Верхний предел";
    case ScenarioPriceActionTypes.PRICE:
      return "Наценка / скидка";
    case ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD:
      return "Наценка / скидка по Бизнес-периоду";
    case ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE:
      return "Наценка / скидка по типу заказа";
    case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
      return "Продукты по-умолчанию";
    case ScenarioSelectorActionTypes.MAX_USAGE:
      return "Максимальное количество";
    case ScenarioSelectorActionTypes.MIN_USAGE:
      return "Минимальное количество";
  }
}
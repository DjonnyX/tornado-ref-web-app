import { ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes, ScenarioProgrammActionTypes } from '@djonnyx/tornado-types';

export const getScenarioTypeName = (type: ScenarioProgrammActionTypes | ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes): string => {
  switch (type) {
    case ScenarioProgrammActionTypes.SWITCH:
      return "Условие";
    case ScenarioProgrammActionTypes.EXPRESSION:
      return "Выражение";
    case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
      return "Бизнесс-период";
    case ScenarioCommonActionTypes.VISIBLE_BY_STORE:
      return "Магазин";
    case ScenarioIntroActionTypes.DURATION:
      return "Продолжительность (мс)";
    case ScenarioProductActionTypes.DOWN_LIMIT:
      return "Нижний предел";
    case ScenarioProductActionTypes.UP_LIMIT:
      return "Верхний предел";
    case ScenarioProductActionTypes.ADDITIONAL_PRICE:
      return "Добавочная стоимость";
    case ScenarioProductActionTypes.FIXED_PRICE:
      return "Фиксированная цена";
    case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
      return "Продукты по-умолчанию";
    case ScenarioSelectorActionTypes.MAX_USAGE:
      return "Максимальное количество";
  }
}
import {
  ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes,
  ScenarioSelectorActionTypes, ScenarioProgrammActionTypes, ScenarioPriceActionTypes
} from '@djonnyx/tornado-types';

export const getScenarioTypeName = (type: ScenarioProgrammActionTypes | ScenarioCommonActionTypes |
  ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes | ScenarioPriceActionTypes): string => {
  switch (type) {
    case ScenarioProgrammActionTypes.SWITCH:
      return "scenario_condition";
    case ScenarioProgrammActionTypes.EXPRESSION:
      return "scenario_expression";
    case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
      return "scenario_available-by-business-periods";
    case ScenarioCommonActionTypes.VISIBLE_BY_STORE:
      return "scenario_available-by-stores";
    case ScenarioCommonActionTypes.VISIBLE_BY_TERMINAL:
      return "scenario_available-by-terminals";
    case ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE:
      return "scenario_available-by-order-types";
    case ScenarioIntroActionTypes.DURATION:
      return "scenario_duration_ms";
    case ScenarioProductActionTypes.DOWN_LIMIT:
      return "scenario_down-limit";
    case ScenarioProductActionTypes.UP_LIMIT:
      return "scenario_up-limit";
    case ScenarioPriceActionTypes.PRICE:
      return "scenario_extra-charge-or-discount";
    case ScenarioPriceActionTypes.PRICE_BY_BUSINESS_PERIOD:
      return "scenario_extra-charge-or-discount-by-business-periods";
    case ScenarioPriceActionTypes.PRICE_BY_ORDER_TYPE:
      return "scenario_extra-charge-or-discount-by-order-types";
    case ScenarioPriceActionTypes.PRICE_BY_STORE:
      return "scenario_extra-charge-or-discount-by-stores";
    case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
      return "scenario_default-products";
    case ScenarioSelectorActionTypes.MAX_USAGE:
      return "scenario_maximum-quantity";
    case ScenarioSelectorActionTypes.MIN_USAGE:
      return "scenario_minimum-quantity";
  }
}
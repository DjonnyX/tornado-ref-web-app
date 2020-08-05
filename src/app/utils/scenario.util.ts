import { ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes } from '@djonnyx/tornado-types';

export const getScenarioTypeName = (type: ScenarioCommonActionTypes | ScenarioIntroActionTypes | ScenarioProductActionTypes | ScenarioSelectorActionTypes): string => {
    switch (type) {
      case ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD:
        return "Visible by business periods";
      case ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE:
        return "Visible by points of sale";
      case ScenarioIntroActionTypes.DURATION:
        return "Intro duration";
      case ScenarioProductActionTypes.DOWN_LIMIT:
        return "Down limit";
      case ScenarioProductActionTypes.UP_LIMIT:
        return "Up limit";
      case ScenarioSelectorActionTypes.DEFAULT_PRODUCTS:
        return "Default products";
      case ScenarioSelectorActionTypes.MAX_USAGE:
        return "Max usage";
    }
  }
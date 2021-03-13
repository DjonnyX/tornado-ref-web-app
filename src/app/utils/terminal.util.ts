import { ITerminal, TerminalTypes } from '@djonnyx/tornado-types';

export const formatTerminalModel = (model: ITerminal) => {
    return {
        name: model.name,
        storeId: model.storeId,
        extra: model.extra,
    } as ITerminal
}

export const getTerminalTypeName = (type: TerminalTypes): string => {
    switch (Number(type)) {
      case TerminalTypes.KIOSK:
        return "Киоск";
      case TerminalTypes.ORDER_PICKER:
        return "Сборщик заказов";
      case TerminalTypes.EQUEUE:
        return "Электронная очередь";
      case TerminalTypes.EQUEUE_CONTROLLER:
        return "Модуль управления электронной очередью";
    }
  }
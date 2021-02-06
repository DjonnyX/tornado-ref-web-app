import { ITerminal } from '@djonnyx/tornado-types';

export const formatTerminalModel = (model: ITerminal) => {
    return {
        name: model.name,
        storeId: model.storeId,
        extra: model.extra,
    } as ITerminal
}
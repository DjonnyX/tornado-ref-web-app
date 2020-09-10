import { ITerminal } from '@djonnyx/tornado-types';

export const formatTerminalModel = (model: ITerminal) => {
    return {
        status: model.status,
        type: model.type,
        name: model.name,
        store: model.store,
        lastwork: model.lastwork,
        extra: model.extra,
    }
}
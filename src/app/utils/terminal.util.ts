import { ITerminal } from '@djonnyx/tornado-types';

export const formatTerminalModel = (model: ITerminal) => {
    return {
        clientId: model.clientId,
        status: model.status,
        type: model.type,
        name: model.name,
        storeId: model.storeId,
        imei: model.imei,
        licenseId: model.licenseId,
        lastwork: model.lastwork,
        extra: model.extra,
    }
}
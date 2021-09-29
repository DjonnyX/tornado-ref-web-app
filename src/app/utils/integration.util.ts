import { IIntegrationEditable } from '@djonnyx/tornado-types';

export const formatIntegrationModel = (model: IIntegrationEditable): IIntegrationEditable => {
    return {
        host: model.host,
        verificationKey: model.verificationKey,
        active: model.active,
    }
}
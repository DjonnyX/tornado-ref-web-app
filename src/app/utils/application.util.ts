import { IApplication } from '@djonnyx/tornado-types';
import { formatVersionModel } from './version.util';

export const formatApplicationModel = (model: IApplication): IApplication => {
    return {
        productId: model.productId,
        terminalType: model.terminalType,
        name: model.name,
        description: model.description,
        version: formatVersionModel(model.version),
        extra: model.extra,
    }
}
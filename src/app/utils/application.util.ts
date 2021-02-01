import { IApplication } from '@djonnyx/tornado-types';
import { formatVersionModel } from './version.util';

export const formatApplicationModel = (model: IApplication): IApplication => {
    return {
        name: model.name,
        description: model.description,
        version: formatVersionModel(model.version),
    }
}
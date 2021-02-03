import { IVersion } from '@djonnyx/tornado-types';

export const formatVersionModel = (model: IVersion): IVersion => {
    return {
        name: model.name,
        code: model.code,
        version: model.version,
    }
}
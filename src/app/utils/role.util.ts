import { IRole } from '@djonnyx/tornado-types';

export const formatRoleModel = (model: IRole): IRole => {
    return {
        name: model.name,
        description: model.description,
        rights: model.rights,
        extra: model.extra,
    }
}
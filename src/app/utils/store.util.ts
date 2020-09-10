import { IStore } from '@djonnyx/tornado-types';

export const formatStoreModel = (model: IStore) => {
    return {
        active: model.active,
        name: model.name,
        address: model.address,
        terminals: model.terminals,
        employes: model.employes,
        extra: model.extra,
    }
}
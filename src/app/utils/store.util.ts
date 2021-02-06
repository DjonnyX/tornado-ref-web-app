import { IStore } from '@djonnyx/tornado-types';

export const formatStoreModel = (model: IStore) => {
    return {
        name: model.name,
        address: model.address,
        extra: model.extra,
    }
}
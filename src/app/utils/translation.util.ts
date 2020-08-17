import { ITranslation } from '@djonnyx/tornado-types';

export const formatTranslationModel = (model: ITranslation) => {
    return {
        language: model.language,
        items: model.items.map(v => ({
            key: v.key,
            value: v.value,
            extra: v.extra,
        })),
        extra: model.extra,
    }
}
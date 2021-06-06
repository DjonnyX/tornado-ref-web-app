import { IAsset } from '@models'

export const formatAssetModel = (model: IAsset) => {
    return {
        active: model.active,
        name: model.name,
        lastUpdate: model.lastUpdate,
        ext: model.ext,
        mipmap: model.mipmap,
        path: model.path,
        extra: {},
    }
}

export const getThumbnail = (asset: IAsset): string => {
    return `url(${asset?.mipmap?.x128.replace('\\', '/')})`;
}

export const getFavicon = (asset: IAsset): string => {
    return `url(${asset?.mipmap?.x32.replace('\\', '/')})`;
}
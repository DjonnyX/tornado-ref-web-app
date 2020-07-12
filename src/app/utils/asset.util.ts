import { IAsset } from '@models'

export const formatAssetModel = (asset: IAsset) => {
    return {
        name: asset.name,
        ext: asset.ext,
        thumbnail: asset.thumbnail,
        path: asset.path,
    }
}

export const getThumbnail = (asset: IAsset): string => {
    return !!asset ? `url(${asset.thumbnail.replace('\\', '/')})` : "";
}
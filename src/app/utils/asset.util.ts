import { IAsset } from '@models'

export const formatAssetModel = (asset: IAsset) => {
    return {
        name: asset.name,
        ext: asset.ext,
        thumbnail: asset.thumbnail,
        favicon: asset.favicon,
        path: asset.path,
    }
}

export const getThumbnail = (asset: IAsset): string => {
    return !!asset && !!asset.thumbnail ? `url(${asset.thumbnail.replace('\\', '/')})` : "";
}

export const getFavicon = (asset: IAsset): string => {
    return !!asset && !!asset.favicon ? `url(${asset.favicon.replace('\\', '/')})` : "";
}
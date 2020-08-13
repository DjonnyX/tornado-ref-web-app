import { IAsset } from '@models'

export const formatAssetModel = (model: IAsset) => {
    return {
        active: model.active,
        name: model.name,
        lastupdate: model.lastupdate,
        ext: model.ext,
        mipmap: model.mipmap,
        path: model.path,
    }
}

export const getThumbnail = (asset: IAsset): string => {
    return !!asset && !!asset.mipmap && !!asset.mipmap.x128 ? `url(${asset.mipmap.x128.replace('\\', '/')})` : "";
}

export const getFavicon = (asset: IAsset): string => {
    return !!asset && !!asset.mipmap && !!asset.mipmap.x32 ? `url(${asset.mipmap.x32.replace('\\', '/')})` : "";
}
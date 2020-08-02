import { IAsset } from '@models'

export const formatAssetModel = (asset: IAsset) => {
    return {
        active: asset.active,
        name: asset.name,
        lastupdate: asset.lastupdate,
        ext: asset.ext,
        mipmap: asset.mipmap,
        path: asset.path,
    }
}

export const getThumbnail = (asset: IAsset): string => {
    return !!asset && !!asset.mipmap && !!asset.mipmap.x128 ? `url(${asset.mipmap.x128.replace('\\', '/')})` : "";
}

export const getFavicon = (asset: IAsset): string => {
    return !!asset && !!asset.mipmap && !!asset.mipmap.x32 ? `url(${asset.mipmap.x32.replace('\\', '/')})` : "";
}
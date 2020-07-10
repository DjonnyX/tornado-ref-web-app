import { IBaseState } from './base';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from '@services';

export interface IProductsState extends IBaseState {
    meta: IMetaRefsResponse;
    isUploadAssetProcess: boolean;
    isRemoveAssetProcess: boolean;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IProduct> | null;
    newProduct: IProduct | null;
    editProduct: IProduct | null;
}
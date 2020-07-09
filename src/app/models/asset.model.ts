import { IReceiptItem } from './receipt.model';
import { IEntity } from './entity.model';

export interface IAsset extends IEntity {
    /**
     * имя
     */
    name: string;
    /**
     * расширение
     */
    ext: string;
    /**
     * путь до ресурса
     */
    path: string;
}

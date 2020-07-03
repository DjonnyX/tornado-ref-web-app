import { IReceiptItem } from './receipt.model';
import { IEntity } from './entity.model';

export interface IProduct extends IEntity {
    name: string;
    description: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
}

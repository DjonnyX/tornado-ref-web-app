import { NodeTypes } from '@app/enums/node-types.enum';
import { IReceiptItem } from './receipt.model';
import { IEntity } from './entity.model';

export interface IProduct extends IEntity {
    description: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
}

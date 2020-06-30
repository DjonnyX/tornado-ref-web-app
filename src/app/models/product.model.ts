import { NodeTypes } from '@app/enums/node-types.enum';
import { IReceiptItem } from './receipt.model';

export interface IProduct {
    id: string;
    name: string;
    description: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
}

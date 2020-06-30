import { NodeTypes } from '@app/enums/node-types.enum';

export interface IReceiptItem {
    name: string;
    description: string;
    calories: number;
    quantity: number;
}

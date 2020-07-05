import { IReceiptItem } from './receipt.model';
import { IEntity } from './entity.model';

export interface IProduct extends IEntity {
    /**
     * имя
     */
    name: string;
    /**
     * описание
     */
    description: string;
    /**
     * объект рецепта
     */
    receipt: Array<IReceiptItem>;
    /**
     * массив идентификаторов тэгов
     */
    tags: Array<string>;
    /**
     * нод для привязки иерархии сущностей
     */
    joint?: string;
}

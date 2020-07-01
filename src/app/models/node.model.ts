import { NodeTypes } from '@app/enums/node-types.enum';
import { IEntity } from './entity.model';

export interface INode extends IEntity {
    /**
     * Тип нода
     */
    type: NodeTypes;
    /**
     * Идентификатор родительского нода
     */
    parentId: string;
    /**
     * Идентификатор Selector или Product
     */
    contentId: string;
    /**
     * Список дочерних нодов
     */
    children: Array<string>;
}
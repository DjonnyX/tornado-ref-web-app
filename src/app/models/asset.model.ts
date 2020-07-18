import { IEntity } from './entity.model';
import { IProgress } from './progress.model';

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
    /**
     * 128x128
     */
    thumbnail: string;
    /**
     * 32x32
     */
    favicon: string;
    // сервисные свойства
    progress?: IProgress;
}

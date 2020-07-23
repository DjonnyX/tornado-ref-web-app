import { IAsset as INativeAsset } from "@djonnyx/tornado-types";
import { IProgress } from './progress.model';

export interface IAsset extends INativeAsset {
    // сервисные свойства
    progress?: IProgress;
}

import { ISchedule } from './schedule.model';

export interface ITicket {
    id: string;
    name: string;
    description: string;
    groups: string[];
    schedule: ISchedule;
}
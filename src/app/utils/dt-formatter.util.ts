import * as moment from 'moment';

export const formatDT = (dtUTC: number): string => {
    return moment(dtUTC).format("DD MM YYYY hh:mm:ss");
}
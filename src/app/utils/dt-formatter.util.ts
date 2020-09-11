import * as moment from 'moment';

export const formatDT = (dtUTC: Date | number | string): string => {
    return moment(dtUTC).format("DD MM YYYY hh:mm:ss");
}
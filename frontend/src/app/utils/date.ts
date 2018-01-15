import { Moment } from 'moment';

export function formatDisplayDateTime(dateTime?: Moment): string {
  return dateTime ? dateTime.format('DD.MM.YYYY hh:mm') : '';
}

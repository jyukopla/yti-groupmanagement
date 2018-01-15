import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { formatDisplayDateTime } from '../utils/date';

@Pipe({name: 'dateTime'})
export class FormatDateTimePipe implements PipeTransform {

  transform(value: Moment): string {
    return formatDisplayDateTime(value);
  }
}

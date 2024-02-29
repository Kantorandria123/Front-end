// date-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/fr';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Utiliser moment.js pour formater la date
    moment.locale('fr');
    return moment(value, 'YYYY-MM-DD').locale('fr').format('DD MMMM YYYY');
  }
}

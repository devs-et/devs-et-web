import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentAgo'
})
export class MomentAgoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {

    return moment(value).fromNow()
  }

}

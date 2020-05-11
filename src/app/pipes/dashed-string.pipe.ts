import { Pipe, PipeTransform } from '@angular/core';
import { toDashedString } from '../lib/dashed-string';

@Pipe({
  name: 'dashedString'
})
export class DashedStringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return toDashedString(value)
  }

}

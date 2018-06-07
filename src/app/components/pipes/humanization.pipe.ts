import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanization'
})
export class HumanizationPipe implements PipeTransform {

  transform(time: string | Date): string {
    if (typeof time === 'string') {}
    return '';
  }
  private _stringToDate(): Date {
    return null;
  }
}

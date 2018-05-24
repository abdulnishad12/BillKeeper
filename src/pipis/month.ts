import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'month'})
export class MonthPipe implements PipeTransform
{
   transform(value:any, args:string[]): any {
     let monthNames: string[] = [ " ","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
     return monthNames[value];
   }
}
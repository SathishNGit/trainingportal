import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(resultSet: any[], input: any, value:any): any {
    if(!resultSet) return [undefined];
    if(!input) return resultSet;

    input = input.toLowerCase();
    if(input == '' || input == null) return [undefined];
    return resultSet.filter(records => records[value].toLowerCase().indexOf(input) > -1);
  }

}

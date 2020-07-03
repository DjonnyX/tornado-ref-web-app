import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], pattern: string): any[] {  
    if (!items) return [];
    if (!pattern || pattern === "") return items;
    return items.filter(it => 
    it.name.toLowerCase().indexOf(pattern.toLowerCase()) !== -1);
  }

}

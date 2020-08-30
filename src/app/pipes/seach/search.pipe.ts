import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], pattern: string, defaultLanguage?: string): any[] {
    if (!items) return [];
    if (!pattern || pattern === "") return items;
    return !!defaultLanguage
      ? items.filter(it =>
        !!it.contents && !!it.contents[defaultLanguage] && it.contents[defaultLanguage].name.toLowerCase().indexOf(pattern.toLowerCase()) !== -1)
      : items.filter(it =>
        it.name.toLowerCase().indexOf(pattern.toLowerCase()) !== -1);
  }

}

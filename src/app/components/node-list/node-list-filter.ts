import { Pipe, PipeTransform } from '@angular/core';
import { ISelector } from '@models';

@Pipe({
  name: 'nodeListFilter'
})
export class NodeListFilterPipe implements PipeTransform {

  transform(items: any[], dictionary: { [id: string]: ISelector }): any[] {
    if (!items) return [];
    if (!dictionary) return items;
    return items.filter(it => !!dictionary[it.contentId]);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const v = parseInt(value) * 0.01;

    return v.toFixed(2);
  }

}

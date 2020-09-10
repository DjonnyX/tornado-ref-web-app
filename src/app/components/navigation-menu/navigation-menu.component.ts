import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { INavRoute } from './interfaces';

@Component({
  selector: 'ta-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  @Input() collection: Array<INavRoute>;

  @Input() selected: number = 0;

  @Output() select = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  selectRoute(index: number) {
    this.select.emit(index);
  }

  toggleExpand(item: INavRoute) { 
    item.expanded = !item.expanded;
  }

  getIconClass(item: INavRoute): string {
    return `icon-${item.icon}`;
  }

  hasExistsIndex(collection: Array<INavRoute>, index: number): boolean {
    for (let i = 0, l = collection.length; i < l; i++) {
      if (!!collection[i].children && collection[i].children.length > 0) {
        const isExistsIndex = this.hasExistsIndex(collection[i].children, index);
        if (!!isExistsIndex) {
          return true;
        }
      } else {
        if (collection[i].index === index) {
          return true;
        }
      }
    }
    return false;
  }
}

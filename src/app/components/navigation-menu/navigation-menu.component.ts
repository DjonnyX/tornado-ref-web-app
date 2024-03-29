import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { LocalizationService } from '@app/services/localization/localization.service';
import { INavRoute } from './interfaces';

@Component({
  selector: 'ta-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  get classes() {
    return { 'navigation-menu': true, [this.size]: true };
  }

  @Input() collection: Array<INavRoute>;

  @Input() selected: number = 0;

  @Input() size: string = "normal";

  @Output() select = new EventEmitter<number>();

  constructor(
    public readonly authService: AuthService,
    public readonly localization: LocalizationService,
  ) { }

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
      const node = collection[i];
      if (!!node.children && node.children.length > 0) {
        const isExistsIndex = this.hasExistsIndex(node.children, index);
        if (!!isExistsIndex) {
          return true;
        }
      } else {
        if (node.index === index) {
          return true;
        }
      }
    }
    return false;
  }
}

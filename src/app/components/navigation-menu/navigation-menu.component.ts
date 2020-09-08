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
}

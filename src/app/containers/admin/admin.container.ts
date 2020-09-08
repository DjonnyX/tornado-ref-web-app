import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { MediaObserver } from '@angular/flex-layout';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { AdminSelectors } from '@store/selectors';
import { INavRoute } from '@components/navigation-menu/interfaces';
import { AdminActions } from '@store/actions/admin.action';
import { BaseComponent } from '@components/base/base-component';
import { UserActions } from '@store/actions/user.action';

@Component({
  selector: 'ta-admin',
  templateUrl: './admin.container.html',
  styleUrls: ['./admin.container.scss']
})
export class AdminContainer extends BaseComponent implements OnInit, OnDestroy {

  isMobile$: Observable<boolean>;

  currentRouteIndex$: Observable<number>;

  currentRoute$: Observable<INavRoute>;

  sidenavIsOpen$: Observable<boolean>;

  roteCollection: Array<INavRoute> = [
    {
      name: "Refs",
      children: [
        {
          name: "Menu",
          route: "menu-tree",
        },
        {
          name: "Categories",
          children: [
            {
              name: "Menu categories",
              route: "menu-categories",
            },
            {
              name: "Schema categories",
              route: "schema-categories",
            },
          ]
        },
        {
          name: "Products",
          route: "products",
        },
        {
          name: "Currencies",
          route: "currencies",
        },
        {
          name: "Tags",
          route: "tags",
        },
        {
          name: "Order types",
          route: "order-types",
        },
        {
          name: "Business periods",
          route: "business-periods",
        },
        {
          name: "Languages",
          route: "languages",
        },
        {
          name: "Adverts",
          children: [
            {
              name: "Intros",
              route: "intros",
            },
            {
              name: "Banners",
              route: "banners",
            },
          ],
        },
      ]
    },
  ];

  private _currentRouteIndex: number;

  constructor(private _media: MediaObserver, private _router: Router, private _activatedRoute: ActivatedRoute, private _store: Store<IAppState>) {
    super();
  }

  private extractUrlPath(url: string): string {
    const urlPath = url?.match(/(?<=(\/admin\/))([\w-])+/);
    return !!urlPath && urlPath.length > 0 ? urlPath[0] : undefined;
  }

  private getIndexByRoute(route: string, collection: Array<INavRoute>): number {
    let result = -1;
    for (let i = 0, l = collection.length; i < l; i++) {
      if (!!collection[i].children) {
        const index = this.getIndexByRoute(route, collection[i].children);
        if (index > -1) {
          return index;
        }
      } else {
        if (collection[i].route === route) {
          return collection[i].index;
        }
      }
    }
    return result;
  }

  private findRouteByIndex(index: number, collection: Array<INavRoute>): INavRoute {
    let result: INavRoute;
    for (let i = 0, l = collection.length; i < l; i++) {
      if (!!collection[i].children && collection[i].children.length > 0) {
        const route = this.findRouteByIndex(index, collection[i].children);
        if (!!route) {
          return route;
        }
      } else {
        if (collection[i].index === index) {
          return collection[i];
        }
      }
    }
    return result;
  }

  private normalizedRoutesCollection(collection: Array<INavRoute>, startIndex: number = 0): number {
    let result = 0;
    for (let i = 0, l = collection.length; i < l; i++) {
      if (!!collection[i].children && collection[i].children.length > 0) {
        result += this.normalizedRoutesCollection(collection[i].children, result);
      } else {
        const normalizedIndex = result + startIndex;
        collection[i].index = normalizedIndex;
        result++;
      }
    }

    return result;
  }

  ngOnInit() {

    this.normalizedRoutesCollection(this.roteCollection);

    this._router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      const url = this.extractUrlPath(event.url);
      const index = this.getIndexByRoute(url, this.roteCollection);

      if (index > -1 && this._currentRouteIndex !== index) {
        this._store.dispatch(AdminActions.setCurrentRouteIndex({ currentRouteIndex: index }));
      }
    });

    this.sidenavIsOpen$ = this._store.pipe(
      select(AdminSelectors.selectSidenavIsOpen),
    );

    this.currentRouteIndex$ = this._store.pipe(
      select(AdminSelectors.selectCurrentRouteIndex),
    );

    this.currentRouteIndex$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(index => {
      this._currentRouteIndex = index;
    });

    this.currentRoute$ = this.currentRouteIndex$.pipe(
      map(index => this.findRouteByIndex(index, this.roteCollection)),
    );

    this.isMobile$ = this._media.media$.pipe(
      map(v => v.suffix === 'Xs')
    );

    this.isMobile$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(v => {
      if (!v) this._store.dispatch(AdminActions.setSidenavOpen({ sidenavIsOpen: false }));
    });
  }

  closeSidenav() {
    this._store.dispatch(AdminActions.setSidenavOpen({ sidenavIsOpen: false }));
  }

  openSidenav() {
    this._store.dispatch(AdminActions.setSidenavOpen({ sidenavIsOpen: true }));
  }

  toggleSidenav() {
    this._store.dispatch(AdminActions.toggleSideNav());
  }

  selectRoute(index: number) {
    const route = this.findRouteByIndex(index, this.roteCollection);

    if (!route?.route) {
      return;
    }

    this._router.navigate([route.route], {
      relativeTo: this._activatedRoute,
    });
    this._store.dispatch(AdminActions.setCurrentRouteIndex({ currentRouteIndex: route.index }));
    this.closeSidenav();
  }

  signout() {
    this._store.dispatch(UserActions.signoutRequest());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

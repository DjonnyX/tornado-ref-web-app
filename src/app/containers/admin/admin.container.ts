import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { MediaObserver } from '@angular/flex-layout';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { AdminSelectors } from '@store/selectors';
import { INavRoute } from '@components/navigation-menu/interfaces';
import { AdminActions } from '@store/actions/admin.action';
import { BaseComponent } from '@components/base/base-component';
import { UserActions } from '@store/actions/user.action';
import { RoleTypes } from '@enums/role-types';
import { UserRights } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-admin',
  templateUrl: './admin.container.html',
  styleUrls: ['./admin.container.scss']
})
export class AdminContainer extends BaseComponent implements OnInit, OnDestroy {

  isMobile$: Observable<boolean>;

  size$: Observable<string>;

  currentRouteIndex$: Observable<number>;

  currentRoute$: Observable<INavRoute>;

  sidenavIsOpen$: Observable<boolean>;

  roteCollection: Array<INavRoute> = [
    {
      icon: "folder",
      name: "Настройки",
      roles: [RoleTypes.ADMIN],
      children: [
        {
          icon: "license",
          name: "Типы лицензий",
          route: "license-types",
        },
        {
          icon: "license",
          name: "Интеграции",
          route: "integrations",
        },
        {
          icon: "license",
          name: "Лицензии",
          route: "licenses",
        },
        {
          icon: "application",
          name: "Приложения",
          route: "applications",
        },
      ]
    },
    {
      icon: "folder",
      name: "Настройки",
      roles: [RoleTypes.CLIENT],
      children: [
        {
          icon: "license",
          name: "Лицензии",
          route: "licenses-account",
        },
        {
          icon: "devices",
          name: "Устройства",
          route: "terminals",
        },
        {
          icon: "markets",
          name: "Магазины",
          route: "stores",
        },
        {
          icon: "backups",
          name: "Бэкапы",
          route: "backups",
        },
        {
          icon: "folder-themes",
          name: "Темы",
          children: [
            {
              icon: "menu-theme",
              name: "Киоск",
              route: "themes-kiosk",
            },
            {
              icon: "queue",
              name: "Электронная очередь",
              route: "themes-eq",
            },
            {
              icon: "order-admin",
              name: "Сборщик заказов",
              route: "themes-order-picker",
            },
          ]
        },
      ]
    },
    {
      icon: "folder",
      name: "Контент",
      roles: [RoleTypes.CLIENT],
      children: [
        {
          icon: "folder-menu",
          name: "Формирование меню",
          children: [
            {
              icon: "menu-theme",
              name: "Меню",
              route: "menu-tree",
            },
            {
              icon: "products",
              name: "Товары",
              route: "products",
            },
            {
              icon: "tags",
              name: "Тэги",
              route: "tags",
            },
            {
              icon: "folder-menu",
              name: "Группы",
              children: [
                {
                  icon: "menu-group",
                  name: "Группы меню",
                  route: "menu-categories",
                },
                {
                  icon: "modifiers-group",
                  name: "Группы модификаторов",
                  route: "schema-categories",
                },
              ]
            },
          ],
        },
        {
          icon: "folder",
          name: "Рекламы",
          children: [
            {
              icon: "splash-screen",
              name: "Заставки",
              route: "intros",
            },
            {
              icon: "splash-screen-disconnected",
              name: "Заставка (терминал не работает)",
              route: "service-unavailable-intros",
            },
            {
              icon: "banners",
              name: "Банеры",
              route: "banners",
            },
          ],
        },
        {
          icon: "folder",
          name: "Дополнительно",
          children: [
            {
              icon: "checkue",
              name: "Чеки",
              route: "checkues",
              right: UserRights.ENABLE_CHECKUES,
            },
            {
              icon: "currency",
              name: "Валюты",
              route: "currencies",
            },

            {
              icon: "order-types",
              name: "Типы заказов",
              route: "order-types",
            },
            {
              icon: "business-periods",
              name: "Бизнес-периоды",
              route: "business-periods",
            },
            {
              icon: "languages",
              name: "Языки",
              route: "languages",
            },
          ]
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
    let result = startIndex;
    for (let i = 0, l = collection.length; i < l; i++) {
      if (!!collection[i].children && collection[i].children.length > 0) {
        collection[i].expanded = true;
        result = this.normalizedRoutesCollection(collection[i].children, result);
      } else {
        collection[i].index = result;
        result++;
      }
    }

    return result;
  }

  ngOnInit() {
    this.normalizedRoutesCollection(this.roteCollection);

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = this.extractUrlPath(event.urlAfterRedirects);
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

    this.size$ = this._media.media$.pipe(
      takeUntil(this.unsubscribe$),
      map(v => v.suffix?.toLowerCase()),
    );

    this.isMobile$ = this.size$.pipe(
      map(v => v === "xs"),
    );

    this.isMobile$.subscribe(v => {
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

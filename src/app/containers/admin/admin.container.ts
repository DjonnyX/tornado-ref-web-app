import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { MediaObserver } from '@angular/flex-layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { AdminSelectors, SettingsSelectors } from '@store/selectors';
import { INavRoute } from '@components/navigation-menu/interfaces';
import { AdminActions } from '@store/actions/admin.action';
import { BaseComponent } from '@components/base/base-component';
import { UserActions } from '@store/actions/user.action';
import { DefaultRoleTypes, UserRights } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';
import { SettingsActions } from '@store/actions/settings.action';
import { FormControl } from '@angular/forms';
import LOCALIZATION from '@app/localization';

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

  parentRoute$: Observable<INavRoute>;

  sidenavIsOpen$: Observable<boolean>;

  roteCollection: Array<INavRoute> = [
    {
      icon: "folder",
      name: "menu_settings", //"Настройки",
      roles: [DefaultRoleTypes.ADMIN],
      children: [
        {
          icon: "license",
          name: "menu_license-types", //"Типы лицензий",
          route: "license-types",
          right: UserRights.READ_LICENSE_TYPES,
        },
        {
          icon: "license",
          name: "menu_integrations", //"Интеграции",
          route: "integrations",
          right: UserRights.READ_INTEGRATIONS,
        },
        {
          icon: "license",
          name: "menu_licenses", //"Лицензии",
          route: "licenses",
          right: UserRights.READ_LICENSES,
        },
        // {
        //   icon: "application",
        //   name: "menu_applications", //"Приложения",
        //   route: "applications",
        //   right: UserRights.READ_APPLICATIONS,
        // },
      ]
    },
    {
      icon: "license",
      name: "menu_user-profile", //"Профиль пользователя",
      route: "profile",
      roles: [DefaultRoleTypes.OWNER, DefaultRoleTypes.EMPLOYEE, "any"],
    },
    {
      icon: "folder",
      name: "menu_user-settings", //"Настройки",
      roles: [DefaultRoleTypes.OWNER, DefaultRoleTypes.EMPLOYEE, "any"],
      children: [
        {
          icon: "license",
          name: "menu_user-licenses", //"Лицензии",
          route: "licenses-account",
          right: UserRights.READ_LICENSES,
        },
        {
          icon: "devices",
          name: "menu_devices", //"Устройства",
          route: "terminals",
          right: UserRights.READ_TERMINALS,
        },
        {
          icon: "markets",
          name: "menu_stores", //"Магазины",
          route: "stores",
          right: UserRights.READ_STORES,
        },
        {
          icon: "backups",
          name: "menu_backups", //"Бэкапы",
          route: "backups",
          right: UserRights.VIEW_BACKUPS,
        },
        {
          icon: "folder-themes",
          name: "menu_themes", //Темы",
          expanded: false,
          right: UserRights.READ_THEMES,
          children: [
            {
              icon: "menu-theme",
              name: "menu_app-kiosk", //"Киоск",
              route: "themes-kiosk",
              right: UserRights.READ_THEMES,
            },
            {
              icon: "queue",
              name: "menu_app-eq", //"Электронная очередь",
              route: "themes-eq",
              right: UserRights.READ_THEMES,
            },
            {
              icon: "order-admin",
              name: "menu_app-order-picker", //"Сборщик заказов",
              route: "themes-order-picker",
              right: UserRights.READ_THEMES,
            },
          ]
        },
      ]
    },
    {
      icon: "folder",
      name: "menu_user-content", //"Контент",
      roles: [DefaultRoleTypes.OWNER, DefaultRoleTypes.EMPLOYEE, "any"],
      children: [
        {
          icon: "folder-menu",
          name: "menu_menu-folder", //"Формирование меню",
          expanded: false,
          right: UserRights.READ_MENU,
          children: [
            {
              icon: "menu-theme",
              name: "menu_menu", //"Меню",
              route: "menu-tree",
              right: UserRights.READ_MENU,
            },
            {
              icon: "products",
              name: "menu_products", //"Товары",
              route: "products",
              right: UserRights.READ_PRODUCTS,
            },
            {
              icon: "tags",
              name: "menu_tags", //"Тэги",
              route: "tags",
              right: UserRights.READ_TAGS,
            },
            {
              icon: "folder-menu",
              name: "menu_menu-groups", //"Группы",
              expanded: false,
              right: UserRights.READ_SELECTORS,
              children: [
                {
                  icon: "menu-group",
                  name: "menu_menu-categories", //"Группы меню",
                  route: "menu-categories",
                  right: UserRights.READ_SELECTORS,
                },
                {
                  icon: "modifiers-group",
                  name: "menu_menu-schema-categories", //"Группы модификаторов",
                  route: "schema-categories",
                  right: UserRights.READ_SELECTORS,
                },
              ]
            },
          ],
        },
        {
          icon: "folder",
          name: "menu_ads", //"Рекламы",
          expanded: false,
          right: UserRights.READ_ADS,
          children: [
            {
              icon: "splash-screen",
              name: "menu_splash-screen", //"Заставки",
              route: "intros",
              right: UserRights.READ_ADS,
            },
            {
              icon: "splash-screen-disconnected",
              name: "menu_splash-screen-disconnected", //"Заставка (терминал не работает)",
              route: "service-unavailable-intros",
              right: UserRights.READ_ADS,
            },
            {
              icon: "banners",
              name: "menu_banners", //"Банеры",
              route: "banners",
              right: UserRights.READ_ADS,
            },
          ],
        },
        {
          icon: "folder",
          name: "menu_advanced-settings", //"Дополнительно",
          expanded: false,
          children: [
            {
              icon: "checkue",
              name: "menu_checkues", //"Чеки",
              route: "checkues",
              right: UserRights.READ_CHECKUES,
            },
            {
              icon: "currency",
              name: "menu_currencies", //"Валюты",
              route: "currencies",
              right: UserRights.READ_CURRENCIES,
            },
            {
              icon: "order-types",
              name: "menu_order-types", //"Типы заказов",
              route: "order-types",
              right: UserRights.READ_ORDER_TYPES,
            },
            {
              icon: "business-periods",
              name: "menu_business-periods", //"Бизнес-периоды",
              route: "business-periods",
              right: UserRights.READ_BUSINESS_PERIODS,
            },
            {
              icon: "languages",
              name: "menu_languages", //"Языки",
              route: "languages",
              right: UserRights.READ_LANGUAGES,
            },
          ]
        },
      ]
    },
  ];

  // Нужно будет сделать правильно!
  public readonly languages = [
    { code: "ru", data: LOCALIZATION.ru },
    { code: "eng", data: LOCALIZATION.eng },
  ];

  ctrlLanguage = new FormControl(null, []);

  selectedLang: any;

  isMenuOpened: boolean = false;

  private _currentRouteIndex: number;

  btnThemeClasses: any = { 'tab-button__icon': true };

  isRollupActive: boolean = false;

  constructor(
    private _media: MediaObserver,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  onToggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  toggleRollupButton(): void {
    this.isRollupActive = !this.isRollupActive;
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

  private normalizedRoutesCollection(collection: Array<INavRoute>, startIndex: number = 0, parent: INavRoute = null): number {
    let result = startIndex;
    for (let i = 0, l = collection.length; i < l; i++) {
      if (!!collection[i].children && collection[i].children.length > 0) {
        if (collection[i].expanded === undefined) {
          collection[i].expanded = true;
        }
        result = this.normalizedRoutesCollection(collection[i].children, result, collection[i]);
      } else {
        collection[i].index = result;
        collection[i].parent = parent;
        result++;
      }
    }

    return result;
  }

  onThemeToggle(): void {
    this._store.dispatch(SettingsActions.toggleTheme());
  }

  ngOnInit() {
    this.ctrlLanguage.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      filter(v => !!v),
    ).subscribe(
      v => {
        this._store.dispatch(SettingsActions.changeLanguage({ language: v }));
      }
    );

    this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(SettingsSelectors.selectLanguage),
    ).subscribe(
      v => {
        this.ctrlLanguage.setValue(v);
        this.selectedLang = this.languages.find(l => l.code === v);
      }
    );

    this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(SettingsSelectors.selectTheme),
    ).subscribe(
      v => {
        this.btnThemeClasses = { ['tab-button__icon']: true, [`icon-theme-${v}`]: true };
      }
    );

    this.normalizedRoutesCollection(this.roteCollection);

    this._router.events.pipe(
      takeUntil(this.unsubscribe$),
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

    this.parentRoute$ = this.currentRoute$.pipe(
      map(route => route.parent),
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

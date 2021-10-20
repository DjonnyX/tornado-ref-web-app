import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { MediaObserver } from '@angular/flex-layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { DocumentationSelectors, SettingsSelectors } from '@store/selectors';
import { INavRoute } from '@components/navigation-menu/interfaces';
import { DocumentationActions } from '@store/actions/documentation.action';
import { BaseComponent } from '@components/base/base-component';
import { UserActions } from '@store/actions/user.action';
import { LocalizationService } from '@app/services/localization/localization.service';
import { SettingsActions } from '@store/actions/settings.action';
import { FormControl } from '@angular/forms';
import LOCALIZATION from '@app/localization';

export const MENU_ROUTES: Array<INavRoute> = [
  {
    icon: "folder",
    name: "documentation-menu_start-work", //"Настройки",
    expanded: true,
    roles: ["any"],
    children: [
      {
        icon: "folder",
        name: "documentation-menu_registration", //"Типы лицензий",
        route: "registration",
      },
      {
        icon: "folder",
        name: "documentation-menu_profile", //"Типы лицензий",
        route: "registration",
      },
      {
        icon: "folder",
        name: "documentation-menu_integration", //"Интеграции",
        route: "integrations",
        expanded: true,
        children: [
          {
            icon: "folder",
            name: "documentation-menu_integration-evotor", //"Интеграции",
            route: "integrations",
          }
        ]
      },
      {
        icon: "folder",
        name: "documentation-menu_users-and-rights", //"Интеграции",
        route: "integrations",
        expanded: true,
        children: [
          {
            icon: "folder",
            name: "documentation-menu_users-settings", //"Интеграции",
            route: "integrations",
          },
          {
            icon: "folder",
            name: "documentation-menu_rights-settings", //"Интеграции",
            route: "integrations",
          }
        ]
      },
      {
        icon: "folder",
        name: "documentation-menu_menu-tree-settings", //"Лицензии",
        route: "licenses",
        expanded: true,
        children: [
          {
            icon: "folder",
            name: "documentation-menu_products", //"Интеграции",
            route: "integrations",
          },
          {
            icon: "folder",
            name: "documentation-menu_product-groups", //"Интеграции",
            route: "integrations",
          },
          {
            icon: "folder",
            name: "documentation-modifiers", //"Интеграции",
            route: "integrations",
          },
          {
            icon: "folder",
            name: "documentation-menu_menu-tree", //"Интеграции",
            route: "integrations",
          }
        ]
      },
      {
        icon: "folder",
        name: "documentation-menu_ads-and-banners-settings", //"Приложения",
        route: "applications",
      },
    ]
  },
];

@Component({
  selector: 'ta-documentation',
  templateUrl: './documentation.container.html',
  styleUrls: ['./documentation.container.scss']
})
export class DocumentationContainer extends BaseComponent implements OnInit, OnDestroy {

  isMobile$: Observable<boolean>;

  size$: Observable<string>;

  currentRouteIndex$: Observable<number>;

  currentRoute$: Observable<INavRoute>;

  parentRoute$: Observable<INavRoute>;

  sidenavIsOpen$: Observable<boolean>;

  roteCollection: Array<INavRoute> = MENU_ROUTES;

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
    const urlPath = url?.match(/(?<=(\/documentation\/))([\w-])+/);
    return !!urlPath && urlPath.length > 0 ? urlPath[0] : undefined;
  }

  private getIndexByRoute(route: string, collection: Array<INavRoute>): number {
    let result = -1;
    for (let i = 0, l = collection.length; i < l; i++) {
      const node = collection[i];
      if (!!node.children) {
        const index = this.getIndexByRoute(route, node.children);
        if (index > -1) {
          return index;
        }
      } else {
        if (node.route === route) {
          return node.index;
        }
      }
    }
    return result;
  }

  private findRouteByIndex(index: number, collection: Array<INavRoute>): INavRoute {
    let result: INavRoute;
    for (let i = 0, l = collection.length; i < l; i++) {
      const node = collection[i];
      if (!!node.children && node.children.length > 0) {
        const route = this.findRouteByIndex(index, node.children);
        if (!!route) {
          return route;
        }
      } else {
        if (node.index === index) {
          return node;
        }
      }
    }
    return result;
  }

  private normalizedRoutesCollection(collection: Array<INavRoute>, startIndex: number = 0, parent: INavRoute = null): number {
    let result = startIndex;
    for (let i = 0, l = collection.length; i < l; i++) {
      const node = collection[i];
      if (!!node.children && node.children.length > 0) {
        node.anyRights = [];

        if (node.expanded === undefined) {
          node.expanded = true;
        }

        node.parent = parent;

        result = this.normalizedRoutesCollection(node.children, result, node);
      } else {
        node.index = result;
        node.parent = parent;

        let n = node;
        while (!!n.parent) {
          n = n.parent;
          if (node.right !== undefined && n.anyRights.indexOf(node.right) === -1) {
            n.anyRights.push(node.right);
          }
        }

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
        this._store.dispatch(DocumentationActions.setCurrentRouteIndex({ currentRouteIndex: index }));
      }
    });

    this.sidenavIsOpen$ = this._store.pipe(
      select(DocumentationSelectors.selectSidenavIsOpen),
    );

    this.currentRouteIndex$ = this._store.pipe(
      select(DocumentationSelectors.selectCurrentRouteIndex),
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
      if (!v) this._store.dispatch(DocumentationActions.setSidenavOpen({ sidenavIsOpen: false }));
    });
  }

  closeSidenav() {
    this._store.dispatch(DocumentationActions.setSidenavOpen({ sidenavIsOpen: false }));
  }

  openSidenav() {
    this._store.dispatch(DocumentationActions.setSidenavOpen({ sidenavIsOpen: true }));
  }

  toggleSidenav() {
    this._store.dispatch(DocumentationActions.toggleSideNav());
  }

  selectRoute(index: number) {
    const route = this.findRouteByIndex(index, this.roteCollection);

    if (!route?.route) {
      return;
    }

    this._router.navigate([route.route], {
      relativeTo: this._activatedRoute,
    });
    this._store.dispatch(DocumentationActions.setCurrentRouteIndex({ currentRouteIndex: route.index }));
    this.closeSidenav();
  }

  signout() {
    this._store.dispatch(UserActions.signoutRequest());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { MediaObserver } from '@angular/flex-layout';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, take, filter } from 'rxjs/operators';
import { AdminSelectors } from '@store/selectors';
import { INavRoute } from './interfaces';
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
      name: "Menu",
      route: "menu-tree",
    },
    {
      name: "Categories",
      route: "selectors",
    },
    {
      name: "Products",
      route: "products",
    },
    {
      name: "Tags",
      route: "tags",
    }
  ];

  constructor(private _media: MediaObserver, private _router: Router, private _activatedRoute: ActivatedRoute, private _store: Store<IAppState>) {
    super();
  }

  ngOnInit() {

    this.sidenavIsOpen$ = this._store.pipe(
      select(AdminSelectors.selectSidenavIsOpen)
    );

    this.currentRouteIndex$ = this._store.pipe(
      select(AdminSelectors.selectCurrentRouteIndex)
    );

    this.currentRoute$ = this.currentRouteIndex$.pipe(
      map(v => this.roteCollection[v]),
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
    this._store.dispatch(AdminActions.setCurrentRouteIndex({ currentRouteIndex: index }));
    this.closeSidenav();
  }

  signout() {
    this._store.dispatch(UserActions.signoutRequest());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

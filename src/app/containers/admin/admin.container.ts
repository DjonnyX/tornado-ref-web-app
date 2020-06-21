import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AdminSelectors } from '@store/selectors';
import { INavRoute } from './interfaces';
import { AdminActions } from '@store/actions/admin.action';

@Component({
  selector: 'ta-admin',
  templateUrl: './admin.container.html',
  styleUrls: ['./admin.container.scss']
})
export class AdminContainer implements OnInit, OnDestroy {

  isMobile$: Observable<boolean>;

  currentRouteIndex$: Observable<number>;

  sidenavIsOpen$: Observable<boolean>;

  roteCollection: Array<INavRoute> = [
    {
      name: "Menu",
      route: "menu",
    },
    {
      name: "Products",
      route: "products",
    },
    {
      name: "Selectors",
      route: "selectors",
    }
  ];

  private _unsubscribe = new Subject<void>();

  constructor(private _media: MediaObserver, private _router: Router, private _store: Store<IAppState>) { }

  ngOnInit() {

    this.sidenavIsOpen$ = this._store.pipe(
      select(AdminSelectors.selectSidenavIsOpen)
    );

    this.currentRouteIndex$ = this._store.pipe(
      select(AdminSelectors.selectCurrentRouteIndex)
    );

    this.isMobile$ = this._media.media$.pipe(
      map(v => v.suffix === 'Xs')
    );

    this.isMobile$.pipe(
      takeUntil(this._unsubscribe),
    ).subscribe(v => {
      if (!v) this._store.dispatch(AdminActions.setSidenavOpen({ sidenavIsOpen: false }));
    });
  }

  drawerClose() {
    this.closeSidenav();
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

  ngOnDestroy() { }
}

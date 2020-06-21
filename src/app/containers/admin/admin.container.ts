import { Component, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserActions } from '@store/actions/user.action';
import { UserSelectors } from '@store/selectors/user.selector';
import { IUserAuthRequest } from '@services';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, debounceTime } from 'rxjs/operators';
import { AdminSelectors } from '@store/selectors';
import { INavRoute } from './interfaces';
import { AdminActions } from '@store/actions/admin.action';

@Component({
  selector: 'tss-admin-1',
  templateUrl: './admin.container.html',
  styleUrls: ['./admin.container.scss']
})
export class AdminContainer implements OnInit, OnDestroy {

  @ViewChild('sidenav') private _sidenav: MatSidenav;

  private _subscriptionSidenavStatus: Subscription;

  private _subscriptionRouteChange: Subscription;

  private _subscriptionIsMobile: Subscription;

  isMobile$: Observable<boolean>;

  currentRouteIndex$: Observable<number>;

  sidenavIsOpen$: Observable<boolean>;

  sidenavHasBackdrop$: Observable<boolean>;

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

  constructor(private _media: MediaObserver, private _router: Router, private _store: Store<IAppState>) { }

  ngOnInit() {
    
    this.sidenavHasBackdrop$ = this._store.pipe(
      select(AdminSelectors.selectSidenavHasBackdrop)
    );

    this.sidenavIsOpen$ = this._store.pipe(
      select(AdminSelectors.selectSidenavIsOpen)
    );
    
    this.currentRouteIndex$ = this._store.pipe(
      select(AdminSelectors.selectCurrentRouteIndex)
    );
    
    this.isMobile$ = this._media.media$.pipe(
      map(v => v.suffix === 'Xs')
    );
    
    this.isMobile$.subscribe(v => {
      this._store.dispatch(AdminActions.setSidenavHasBackdrop({sidenavHasBackdrop: v}));

      if (!v) this.openSidenav();
    });
  }

  drawerClose() {
    this.closeSidenav();
  }

  closeSidenav() {
    this._store.dispatch(AdminActions.setSidenavIsOpen({sidenavIsOpen: false}));
  }

  openSidenav() {
    this._store.dispatch(AdminActions.setSidenavIsOpen({sidenavIsOpen: true}));
  }

  toggleSidenav() {
    this._store.dispatch(AdminActions.toggleSideNav());
    //this._navMenuService.toggleSideNavState();
  }

  ngOnDestroy() {
  }
}

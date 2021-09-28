import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map, tap, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { RoleActions } from '@store/actions/role.action';
import { RoleSelectors } from '@store/selectors/role.selectors';
import { DefaultRoleTypes, IIntegration, IRole } from '@djonnyx/tornado-types';
import {
  IntegrationSelectors,
  RolesSelectors, UserSelectors,
} from '@store/selectors';
import { RolesActions } from '@store/actions/roles.action';
import { IUserRightData, USER_RIGHTS_LIST } from '@app/utils/right.util';
import { IntegrationActions } from '@store/actions/integration.action';
import { IUserProfile } from '@models';

@Component({
  selector: 'ta-role-creator',
  templateUrl: './role-creator.container.html',
  styleUrls: ['./role-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  role$: Observable<IRole>;

  roles$: Observable<Array<IRole>>;

  readonly$: Observable<boolean>;

  profile$: Observable<IUserProfile>;

  integration$: Observable<IIntegration>;

  private _rights$ = new BehaviorSubject<Array<IUserRightData>>([...USER_RIGHTS_LIST]);
  rights$ = this._rights$.asObservable();

  isEditMode = false;

  private roleId: string;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _store: Store<IAppState>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.roleId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this.roleId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(RoleSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(RoleSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(RoleSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(RolesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isRoleGetProcess, isRoleCreateProcess, isRoleUpdateProcess, isRolesGetProcess, isIntegrationGetProcess]) =>
        isRoleGetProcess || isRoleCreateProcess || isRoleUpdateProcess || isRolesGetProcess || isIntegrationGetProcess
      ),
    );

    this.profile$ = this._store.pipe(
      select(UserSelectors.selectUserProfile),
    );

    this.profile$.pipe(
      takeUntil(this.unsubscribe$),
      tap(profile => {
        this._store.dispatch(IntegrationActions.getRequest({ id: profile.account.integrationId }));
      }),
    );

    this.integration$ = this._store.pipe(
      select(IntegrationSelectors.selectEntity),
    );

    this.integration$.pipe(
      takeUntil(this.unsubscribe$),
      tap(integration => {
        this._rights$.next(USER_RIGHTS_LIST.filter(r => integration.rights?.indexOf(r.value) > -1));
      }),
    );

    this.role$ = this._store.pipe(
      select(RoleSelectors.selectEntity),
    );

    this.roles$ = this._store.pipe(
      select(RolesSelectors.selectCollection),
    );

    this.readonly$ = this.role$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(role => {
        if (!!role &&
          ([DefaultRoleTypes.OWNER, DefaultRoleTypes.EMPLOYEE] as Array<string>).indexOf(role.name) > -1) {
          return of(true);
        }

        return of(false);
      }),
    );

    this.role$.pipe(
      takeUntil(this.unsubscribe$),
      filter(role => !!role),
    ).subscribe(role => {
      this.roleId = role.id;
      this.isEditMode = !!this.roleId;
      this._cdr.markForCheck();
    });

    if (!!this.roleId) {
      this._store.dispatch(RoleActions.getRequest({ id: this.roleId }));
    }

    this._store.dispatch(RolesActions.getAllRequest({
      options: {
        filter: [
          {
            id: "name",
            value: `${DefaultRoleTypes.ADMIN},${DefaultRoleTypes.OWNER}`,
            operation: "notequals",
          },
        ],
      }
    }));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(RoleActions.clear());
    this._store.dispatch(RolesActions.clear());
    this._store.dispatch(IntegrationActions.clear());
  }

  onSubmit(role: IRole): void {
    if (this.isEditMode) {
      this._store.dispatch(RoleActions.updateRequest({ id: role.id, role }));
    } else {
      this._store.dispatch(RoleActions.createRequest({ data: role }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/roles"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/roles"]);
  }
}

import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { DefaultRoleTypes, IRole, IRef } from '@djonnyx/tornado-types';
import { RolesSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { RolesActions } from '@store/actions/roles.action';
import { RoleActions } from '@store/actions/role.action';

@Component({
  selector: 'ta-roles-editor',
  templateUrl: './roles-editor.container.html',
  styleUrls: ['./roles-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public isGetCollectionProcess$: Observable<boolean>;

  public collection$: Observable<Array<IRole>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(RolesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(RolesSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(RolesSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isRolesGetProcess, isRolesUpdateProcess, isRoleDeleteProcess]) =>
        isRolesGetProcess || isRolesUpdateProcess || isRoleDeleteProcess
      ),
    );

    this.isGetCollectionProcess$ = combineLatest([
      this._store.pipe(
        select(RolesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isRolesGetProcess]) =>
        isRolesGetProcess
      ),
    );

    this.collection$ = this._store.pipe(
      select(RolesSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(RolesSelectors.selectRefInfo),
    );

    this._store.dispatch(RolesActions.getAllRequest({
      options: {
        filter: [
          {
            id: "roleType",
            value: `${DefaultRoleTypes.ADMIN},${DefaultRoleTypes.OWNER}`,
            operation: "notequals",
          },
        ],
      }
    }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(RolesActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(RolesActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(role: IRole): void {
    this._store.dispatch(RoleActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: role.id, },
    });
  }

  onView(role: IRole): void {
    this._store.dispatch(RoleActions.clear());

    this._router.navigate(["view"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: role.id, },
    });
  }

  onUpdate(role: IRole): void {
    this._store.dispatch(RolesActions.updateRequest({ id: role.id, role }));
  }

  onDelete(id: string): void {
    this._store.dispatch(RolesActions.deleteRequest({ id }));
  }
}

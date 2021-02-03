import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IntegrationActions } from '@store/actions/integration.action';
import { IntegrationSelectors } from '@store/selectors/integration.selectors';
import { IIntegration, IStore } from '@djonnyx/tornado-types';
import { StoresSelectors } from '@store/selectors';

@Component({
  selector: 'ta-integration-creator',
  templateUrl: './integration-creator.container.html',
  styleUrls: ['./integration-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _integration: IIntegration;

  integration$: Observable<IIntegration>;

  stores$: Observable<Array<IStore>>;

  private _integrationId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._integrationId = this._activatedRoute.snapshot.queryParams["id"];

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(IntegrationSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isIntegrationGetProcess, selectIsUpdateProcess, isStoresGetProcess]) => isIntegrationGetProcess || selectIsUpdateProcess || isStoresGetProcess),
    );

    this.integration$ = this._store.pipe(
      select(IntegrationSelectors.selectEntity),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.integration$.pipe(
      takeUntil(this.unsubscribe$),
      filter(integration => !!integration),
      filter(integration => this._integrationId !== integration.id),
    ).subscribe(integration => {
      this._integrationId = integration.id;
    });

    if (!!this._integrationId) {
      this._store.dispatch(IntegrationActions.getRequest({ id: this._integrationId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(IntegrationActions.clear());
  }

  onSubmit(integration: IIntegration): void {
    this._store.dispatch(IntegrationActions.updateRequest({ id: integration.id, integration }));
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}

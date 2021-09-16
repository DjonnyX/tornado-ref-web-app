import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IntegrationActions } from '@store/actions/integration.action';
import { IntegrationSelectors } from '@store/selectors/integration.selectors';
import { IIntegration, IIntegrationEditable, IIntegrationServerInfo, IStore } from '@djonnyx/tornado-types';
import { IntegrationServerInfoSelectors, StoresSelectors } from '@store/selectors';
import { StoresActions } from '@store/actions/stores.action';
import { IntegrationServerInfoActions } from '@store/actions/integration-server-info.action';

@Component({
  selector: 'ta-integration-creator',
  templateUrl: './integration-creator.container.html',
  styleUrls: ['./integration-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  integration$: Observable<IIntegration>;

  integrationServerInfo$: Observable<IIntegrationServerInfo>;

  stores$: Observable<Array<IStore>>;

  private _integrationId: string;

  isEditMode = false;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._integrationId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._integrationId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(IntegrationServerInfoSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isIntegrationServerInfoGetProcess, isIntegrationGetProcess, selectIsUpdateProcess, isStoresGetProcess]) =>
        isIntegrationServerInfoGetProcess || isIntegrationGetProcess || selectIsUpdateProcess || isStoresGetProcess),
    );

    this.integration$ = this._store.pipe(
      select(IntegrationSelectors.selectEntity),
    );

    this.integrationServerInfo$ = this._store.pipe(
      select(IntegrationServerInfoSelectors.selectEntity),
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
      this.isEditMode = true;
    });

    if (!!this._integrationId) {
      this._store.dispatch(IntegrationActions.getRequest({ id: this._integrationId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(IntegrationActions.clear());
    this._store.dispatch(IntegrationServerInfoActions.clear());
    this._store.dispatch(StoresActions.clear());
  }

  onSubmit(integration: IIntegrationEditable): void {
    if (this.isEditMode) {
      this._store.dispatch(IntegrationActions.updateRequest({ id: integration.id, integration }));
    } else {
      this._store.dispatch(IntegrationActions.createRequest({ integration }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/integrations"]);
  }

  onUpdate(integrationData: IIntegrationEditable) {
    this._store.dispatch(IntegrationServerInfoActions.getRequest({ host: integrationData.host }));
  }

  onToBack(): void {
    this._router.navigate(["/admin/integrations"]);
  }
}

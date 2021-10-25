import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { TarifActions } from '@store/actions/tarif.action';
import { TarifSelectors } from '@store/selectors/tarif.selectors';
import { ITarif, IApplication, IIntegration } from '@djonnyx/tornado-types';
import { ApplicationsSelectors, IntegrationsSelectors } from '@store/selectors';
import { ApplicationsActions } from '@store/actions/applications.action';
import { IntegrationsActions } from '@store/actions/integrations.action';

@Component({
  selector: 'ta-tarif-creator',
  templateUrl: './tarif-creator.container.html',
  styleUrls: ['./tarif-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarifCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  applications$: Observable<Array<IApplication>>;

  integrations$: Observable<Array<IIntegration>>;

  tarif$: Observable<ITarif>;

  isEditMode = false;

  private _tarifId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._tarifId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._tarifId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(TarifSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TarifSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(TarifSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(ApplicationsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isTarifGetProcess, isTarifCreateProcess, selectIsUpdateProcess, isApplicationsGetProcess, isIntegrationsGetProcess]) =>
        isTarifGetProcess || isTarifCreateProcess || selectIsUpdateProcess || isApplicationsGetProcess || isIntegrationsGetProcess),
    );

    this.tarif$ = this._store.pipe(
      select(TarifSelectors.selectEntity),
    );

    this.applications$ = this._store.pipe(
      select(ApplicationsSelectors.selectCollection),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.tarif$.pipe(
      takeUntil(this.unsubscribe$),
      filter(tarif => !!tarif),
      filter(tarif => this._tarifId !== tarif.id),
    ).subscribe(tarif => {
      this._tarifId = tarif.id;
      this.isEditMode = !!this._tarifId;
    });

    if (!!this._tarifId) {
      this._store.dispatch(TarifActions.getRequest({ id: this._tarifId }));
    }

    this._store.dispatch(ApplicationsActions.getAllRequest({}));
    this._store.dispatch(IntegrationsActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(TarifActions.clear());
    this._store.dispatch(ApplicationsActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
  }

  onSubmit(tarif: ITarif): void {
    if (this.isEditMode) {
      this._store.dispatch(TarifActions.updateRequest({ id: tarif.id, tarif }));
    } else {
      this._store.dispatch(TarifActions.createRequest({ tarif }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/tarifs"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/tarifs"]);
  }
}

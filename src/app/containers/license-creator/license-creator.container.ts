import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LicenseActions } from '@store/actions/license.action';
import { LicenseSelectors } from '@store/selectors/license.selectors';
import { IIntegration, ILicense, ILicenseType, IStore } from '@djonnyx/tornado-types';
import { IntegrationsSelectors, LicenseTypesSelectors, StoresSelectors } from '@store/selectors';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { IntegrationsActions } from '@store/actions/integrations.action';

@Component({
  selector: 'ta-license-creator',
  templateUrl: './license-creator.container.html',
  styleUrls: ['./license-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _license: ILicense;

  license$: Observable<ILicense>;

  licenseTypes$: Observable<Array<ILicenseType>>;

  integrations$: Observable<Array<IIntegration>>;

  stores$: Observable<Array<IStore>>;

  isEditMode = false;

  private _licenseId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._licenseId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._licenseId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(LicenseSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LicenseSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(LicenseSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LicenseTypesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isLicenseGetProcess, isLicenseCreateProcess, isLicenseUpdateProcess, isStoresGetProcess,
        isLicenseTypesGetProcess, isIntegrationsGetProcess]) =>
        isLicenseGetProcess || isLicenseCreateProcess || isLicenseUpdateProcess || isStoresGetProcess ||
        isLicenseTypesGetProcess || isIntegrationsGetProcess),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.licenseTypes$ = this._store.pipe(
      select(LicenseTypesSelectors.selectCollection),
    );

    this.license$ = this._store.pipe(
      select(LicenseSelectors.selectEntity),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.license$.pipe(
      takeUntil(this.unsubscribe$),
      filter(license => !!license),
      filter(license => this._licenseId !== license.id),
    ).subscribe(license => {
      this._licenseId = license.id;
      this.isEditMode = !!this._licenseId;
    });

    if (!!this._licenseId) {
      this._store.dispatch(LicenseActions.getRequest({ id: this._licenseId }));
    }

    this._store.dispatch(LicenseTypesActions.getAllRequest());
    this._store.dispatch(IntegrationsActions.getAllRequest());
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LicenseActions.clear());
  }

  onSubmit(license: ILicense): void {
    if (this.isEditMode) {
      this._store.dispatch(LicenseActions.updateRequest({ id: license.id, license }));
    } else {
      this._store.dispatch(LicenseActions.createRequest({ license }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}

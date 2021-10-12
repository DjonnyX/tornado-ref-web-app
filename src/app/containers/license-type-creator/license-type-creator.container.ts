import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LicenseTypeActions } from '@store/actions/license-type.action';
import { LicenseTypeSelectors } from '@store/selectors/license-type.selectors';
import { IApplication, IIntegration, ILicenseType, IStore } from '@djonnyx/tornado-types';
import { ApplicationsSelectors, IntegrationsSelectors, StoresSelectors } from '@store/selectors';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { ApplicationsActions } from '@store/actions/applications.action';

@Component({
  selector: 'ta-license-type-creator',
  templateUrl: './license-type-creator.container.html',
  styleUrls: ['./license-type-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseTypeCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  licenseType$: Observable<ILicenseType>;

  applications$: Observable<Array<IApplication>>;

  public integrations$: Observable<Array<IIntegration>>;

  stores$: Observable<Array<IStore>>;

  isEditMode = false;

  private _licenseTypeId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._licenseTypeId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._licenseTypeId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicenseTypeSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LicenseTypeSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(LicenseTypeSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ApplicationsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLicenseTypeGetProcess, isCreateProcess, selectIsUpdateProcess, isIntegrationsProcess, isGetApplicationsProcess]) =>
        isLicenseTypeGetProcess || isCreateProcess || selectIsUpdateProcess || isIntegrationsProcess || isGetApplicationsProcess),
    );

    this.applications$ = this._store.pipe(
      select(ApplicationsSelectors.selectCollection),
    );

    this.licenseType$ = this._store.pipe(
      select(LicenseTypeSelectors.selectEntity),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.licenseType$.pipe(
      takeUntil(this.unsubscribe$),
      filter(licenseType => !!licenseType),
      filter(licenseType => this._licenseTypeId !== licenseType.id),
    ).subscribe(licenseType => {
      this._licenseTypeId = licenseType.id;
      this.isEditMode = !!this._licenseTypeId;
    });

    if (!!this._licenseTypeId) {
      this._store.dispatch(LicenseTypeActions.getRequest({ id: this._licenseTypeId }));
    }

    this._store.dispatch(IntegrationsActions.getAllRequest({}));

    this._store.dispatch(ApplicationsActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LicenseTypeActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
    this._store.dispatch(ApplicationsActions.clear());
  }

  onSubmit(licenseType: ILicenseType): void {
    if (this.isEditMode) {
      this._store.dispatch(LicenseTypeActions.updateRequest({ id: licenseType.id, licenseType }));
    } else {
      this._store.dispatch(LicenseTypeActions.createRequest({ licenseType }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/license-types"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/license-types"]);
  }
}

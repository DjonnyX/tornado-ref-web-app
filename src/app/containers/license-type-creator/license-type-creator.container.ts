import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LicenseTypeActions } from '@store/actions/license-type.action';
import { LicenseTypeSelectors } from '@store/selectors/license-type.selectors';
import { ILicenseType, IStore } from '@djonnyx/tornado-types';
import { StoresSelectors } from '@store/selectors';

@Component({
  selector: 'ta-license-type-creator',
  templateUrl: './license-type-creator.container.html',
  styleUrls: ['./license-type-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseTypeCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _licenseType: ILicenseType;

  licenseType$: Observable<ILicenseType>;

  stores$: Observable<Array<IStore>>;

  isEditMode = false;

  private _licenseTypeId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._licenseTypeId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._licenseTypeId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(LicenseTypeSelectors.selectIsGetProcess),
      ),
      /*this._store.pipe(
        select(LicenseTypeSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(LicenseTypeSelectors.selectIsUpdateProcess),
      ),*/
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isLicenseTypeGetProcess, /*isCreateProcess, selectIsUpdateProcess,*/ isStoresGetProcess]) => isLicenseTypeGetProcess || /*isCreateProcess || selectIsUpdateProcess ||*/ isStoresGetProcess),
    );

    this.licenseType$ = this._store.pipe(
      select(LicenseTypeSelectors.selectEntity),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
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
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LicenseTypeActions.clear());
  }

  onSubmit(licenseType: ILicenseType): void {
    if (this.isEditMode) {
      this._store.dispatch(LicenseTypeActions.updateRequest({ id: licenseType.id, licenseType }));
    } else {
      this._store.dispatch(LicenseTypeActions.createRequest({ licenseType }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}

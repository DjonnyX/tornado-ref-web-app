import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { LicenseTypesSelectors } from '@store/selectors/license-types.selectors';
import { IIntegration, ILicenseType, IRef } from '@djonnyx/tornado-types';
import { IntegrationsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { IntegrationsActions } from '@store/actions/integrations.action';

@Component({
  selector: 'ta-license-types-editor',
  templateUrl: './license-types-editor.container.html',
  styleUrls: ['./license-types-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseTypesEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ILicenseType>>;

  public integrations$: Observable<Array<IIntegration>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicenseTypesSelectors.selectLoading),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([licenseTypesLoading, integrationsLoading]) => licenseTypesLoading || integrationsLoading),
    )

    this.collection$ = this._store.pipe(
      select(LicenseTypesSelectors.selectCollection),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(LicenseTypesSelectors.selectRefInfo),
    );

    this._store.dispatch(LicenseTypesActions.getAllRequest({}));
    this._store.dispatch(IntegrationsActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    this._store.dispatch(LicenseTypesActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
  }

  onCreate(): void {
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(licenseType: ILicenseType): void {
    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: licenseType.id, },
    });
  }

  onUpdate(licenseType: ILicenseType): void {
    this._store.dispatch(LicenseTypesActions.updateRequest({ id: licenseType.id, licenseType }));
  }

  onDelete(id: string): void {
    this._store.dispatch(LicenseTypesActions.deleteRequest({ id }));
  }
}

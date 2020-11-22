import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { LicenseTypesSelectors } from '@store/selectors/license-types.selectors';
import { LicenseTypeActions } from '@store/actions/license-type.action';
import { ILicenseType, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-license-types-editor',
  templateUrl: './license-types-editor.container.html',
  styleUrls: ['./license-types-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseTypesEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ILicenseType>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(LicenseTypesActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(LicenseTypesSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(LicenseTypesSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(LicenseTypesSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(LicenseTypeActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(licenseType: ILicenseType): void {

    this._store.dispatch(LicenseTypeActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: licenseType.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(licenseType: ILicenseType): void {
    this._store.dispatch(LicenseTypesActions.updateRequest({id: licenseType.id, licenseType}));
  }

  onDelete(id: string): void {
    this._store.dispatch(LicenseTypesActions.deleteRequest({ id }));
  }
}

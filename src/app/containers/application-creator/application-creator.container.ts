import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ApplicationActions } from '@store/actions/application.action';
import { ApplicationSelectors } from '@store/selectors/application.selectors';
import { IApplication, IStore } from '@djonnyx/tornado-types';
import { StoresSelectors } from '@store/selectors';

@Component({
  selector: 'ta-application-creator',
  templateUrl: './application-creator.container.html',
  styleUrls: ['./application-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _application: IApplication;

  application$: Observable<IApplication>;

  stores$: Observable<Array<IStore>>;

  isEditMode = false;

  private _applicationId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._applicationId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._applicationId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(ApplicationSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ApplicationSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isApplicationGetProcess, selectIsUpdateProcess, isStoresGetProcess]) => isApplicationGetProcess || selectIsUpdateProcess || isStoresGetProcess),
    );

    this.application$ = this._store.pipe(
      select(ApplicationSelectors.selectEntity),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.application$.pipe(
      takeUntil(this.unsubscribe$),
      filter(application => !!application),
      filter(application => this._applicationId !== application.id),
    ).subscribe(application => {
      this._applicationId = application.id;
      this.isEditMode = !!this._applicationId;
    });

    if (!!this._applicationId) {
      this._store.dispatch(ApplicationActions.getRequest({ id: this._applicationId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(ApplicationActions.clear());
  }

  onSubmit(application: IApplication): void {
    if (this.isEditMode) {
      this._store.dispatch(ApplicationActions.updateRequest({ id: application.id, application }));
    } else {
      this._store.dispatch(ApplicationActions.createRequest({ application }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}

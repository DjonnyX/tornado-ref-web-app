import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { BusinessPeriodSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { BusinessPeriodActions } from '@store/actions/business-period.action';
import { IBusinessPeriod } from '@djonnyx/tornado-types';
import { IBreadCrumbsSegment } from '@app/utils/url-extractor.util';

@Component({
  selector: 'ta-business-period-creator',
  templateUrl: './business-period-creator.container.html',
  styleUrls: ['./business-period-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessPeriodCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  get returnUrl() {
    return this._returnUrl;
  }

  private _businessPeriod: IBusinessPeriod;

  businessPeriod$: Observable<IBusinessPeriod>;

  isEditMode = false;

  private _businessPeriodId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._businessPeriodId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._businessPeriodId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(BusinessPeriodSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(BusinessPeriodSelectors.selectIsCreateProcess),
      ),
    ).pipe(
      map(([isSelectorGetProcess, isSelectorsGetProcess]) => isSelectorGetProcess || isSelectorsGetProcess),
    );

    this.businessPeriod$ = this._store.pipe(
      select(BusinessPeriodSelectors.selectEntity),
    );

    this.businessPeriod$.pipe(
      takeUntil(this.unsubscribe$),
      filter(businessPeriod => !!businessPeriod),
      filter(businessPeriod => this._businessPeriodId !== businessPeriod.id),
    ).subscribe(businessPeriod => {
      this._businessPeriodId = businessPeriod.id;
      this.isEditMode = !!this._businessPeriodId;
    });

    if (!!this._businessPeriodId) {
      this._store.dispatch(BusinessPeriodActions.getRequest({ id: this._businessPeriodId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(BusinessPeriodActions.clear());
  }

  onSubmit(businessPeriod: IBusinessPeriod): void {
    if (this.isEditMode) {
      this._store.dispatch(BusinessPeriodActions.updateRequest({ id: businessPeriod.id, businessPeriod }));
    } else {
      this._store.dispatch(BusinessPeriodActions.createRequest({ businessPeriod }));
    }

    this._router.navigate([this._returnUrl]);
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}

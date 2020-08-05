import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { BusinessPeriodsSelectors } from '@store/selectors';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { BusinessPeriodActions } from '@store/actions/business-period.action';
import { IBusinessPeriod, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-business-periods-editor',
  templateUrl: './business-periods-editor.container.html',
  styleUrls: ['./business-periods-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessPeriodsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IBusinessPeriod>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(BusinessPeriodsActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(BusinessPeriodActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onUpdate(businessPeriod: IBusinessPeriod): void {
    this._store.dispatch(BusinessPeriodsActions.updateRequest({id: businessPeriod.id, businessPeriod}));
  }

  onEdit(businessPeriod: IBusinessPeriod): void {

    this._store.dispatch(BusinessPeriodActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: businessPeriod.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onDelete(id: string): void {
    this._store.dispatch(BusinessPeriodsActions.deleteRequest({ id }));
  }
}
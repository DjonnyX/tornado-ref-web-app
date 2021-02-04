import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { BusinessPeriodsSelectors, LanguagesSelectors } from '@store/selectors';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessPeriodActions } from '@store/actions/business-period.action';
import { IBusinessPeriod, IRef, ILanguage } from '@djonnyx/tornado-types';
import { map, filter } from 'rxjs/operators';
import { LanguagesActions } from '@store/actions/languages.action';

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

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToShow$: Observable<boolean>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(BusinessPeriodsActions.getAllRequest());
    this._store.dispatch(LanguagesActions.getAllRequest());

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(BusinessPeriodsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isProductsProgress, isLanguageProgress]) =>
        isProductsProgress || isLanguageProgress),
    );

    this.collection$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectRefInfo),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.isPrepareToShow$ = combineLatest([
      this.collection$,
      this.languages$,
    ]).pipe(
      map(([collection, languages]) => !!collection && !!languages),
    );
  }

  onCreate(): void {
    this._store.dispatch(BusinessPeriodActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onUpdate(businessPeriod: IBusinessPeriod): void {
    this._store.dispatch(BusinessPeriodsActions.updateRequest({ id: businessPeriod.id, businessPeriod }));
  }

  onEdit(businessPeriod: IBusinessPeriod): void {
    this._store.dispatch(BusinessPeriodActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: businessPeriod.id, },
    });
  }

  onDelete(id: string): void {
    this._store.dispatch(BusinessPeriodsActions.deleteRequest({ id }));
  }
}

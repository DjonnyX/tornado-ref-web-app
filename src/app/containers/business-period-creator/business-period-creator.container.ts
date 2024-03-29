import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { BusinessPeriodSelectors, LanguagesSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { BusinessPeriodActions } from '@store/actions/business-period.action';
import { IBusinessPeriod, ILanguage, IBusinessPeriodContents } from '@djonnyx/tornado-types';
import { deepMergeObjects } from '@app/utils/object.util';
import { normalizeEntityContents, getCompiledContents } from '@app/utils/entity.util';
import { LanguagesActions } from '@store/actions/languages.action';

@Component({
  selector: 'ta-business-period-creator',
  templateUrl: './business-period-creator.container.html',
  styleUrls: ['./business-period-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessPeriodCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  businessPeriod$: Observable<IBusinessPeriod>;

  isEditMode = false;

  private _businessPeriodId: string;

  private _businessPeriodId$ = new BehaviorSubject<string>(undefined);
  readonly businessPeriodId$ = this._businessPeriodId$.asObservable();

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._businessPeriodId = this._activatedRoute.snapshot.queryParams["id"];
    this._businessPeriodId$.next(this._businessPeriodId);

    this.isEditMode = !!this._businessPeriodId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(BusinessPeriodSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(BusinessPeriodSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isBPGetProcess, isBPCreateProcess, isLanguagesProcess]) =>
        isBPGetProcess || isBPCreateProcess || isLanguagesProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(BusinessPeriodSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(BusinessPeriodSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCreateProcess, isUpdateProcess]) =>
        isCreateProcess || isUpdateProcess),
    );

    this.businessPeriod$ = this._store.pipe(
      select(BusinessPeriodSelectors.selectEntity),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.defaultLanguage$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(lang => {
      this._defaultLanguage = lang;
    });

    this.businessPeriod$ = combineLatest([
      this._store.select(BusinessPeriodSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([bp, langs, defaultLang]) => !!bp && !!defaultLang && !!langs),
      map(([bp, langs, defaultLang]) => {
        return { ...bp, contents: getCompiledContents(bp.contents, langs, defaultLang) };
      })
    );

    this.businessPeriod$.pipe(
      takeUntil(this.unsubscribe$),
      filter(businessPeriod => !!businessPeriod),
      filter(businessPeriod => this._businessPeriodId !== businessPeriod.id),
    ).subscribe(businessPeriod => {
      this._businessPeriodId = businessPeriod.id;
      this._businessPeriodId$.next(this._businessPeriodId);
      this.isEditMode = true;

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._businessPeriodId,
        }
      });
    });

    if (!!this._businessPeriodId) {
      this._store.dispatch(BusinessPeriodActions.getRequest({ id: this._businessPeriodId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest({}));

    const prepareMainRequests$ = combineLatest([
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      map(([languages, defaultLanguage]) =>
        !!languages && !!defaultLanguage),
    );

    this.isPrepareToConfigure$ = this.businessPeriodId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest([
          prepareMainRequests$,
          this.businessPeriod$,
        ]).pipe(
          map(([prepareMainRequests, businessPeriod]) =>
            !!prepareMainRequests && !!businessPeriod),
        ) : prepareMainRequests$;
      }),
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(BusinessPeriodActions.clear());
    this._store.dispatch(LanguagesActions.clear());
  }

  onMainOptionsSave(businessPeriod: IBusinessPeriod): void {
    if (this.isEditMode) {
      const normalizedBusinessPeriod: IBusinessPeriod = { ...businessPeriod };

      // нормализация контена
      normalizeEntityContents(normalizedBusinessPeriod.contents, this._defaultLanguage.code);

      this._store.dispatch(BusinessPeriodActions.updateRequest({ id: businessPeriod.id, businessPeriod: normalizedBusinessPeriod }));
    } else {
      this._store.dispatch(BusinessPeriodActions.createRequest({ businessPeriod }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/business-periods"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/business-periods"]);
  }
}

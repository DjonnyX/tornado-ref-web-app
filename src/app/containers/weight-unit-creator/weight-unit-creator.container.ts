import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { LanguagesSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { WeightUnitSelectors } from '@store/selectors/weight-unit.selectors';
import { WeightUnitActions } from '@store/actions/weight-unit.action';
import { IWeightUnit, ILanguage } from '@djonnyx/tornado-types';
import { LanguagesActions } from '@store/actions/languages.action';
import { normalizeEntityContents, getCompiledContents } from '@app/utils/entity.util';

@Component({
  selector: 'ta-weight-unit-creator',
  templateUrl: './weight-unit-creator.container.html',
  styleUrls: ['./weight-unit-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightUnitCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  rootNodeId$: Observable<string>;

  weightUnit$: Observable<IWeightUnit>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _weightUnitId: string;

  private _weightUnitId$ = new BehaviorSubject<string>(undefined);
  readonly weightUnitId$ = this._weightUnitId$.asObservable();

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._weightUnitId = this._activatedRoute.snapshot.queryParams["id"];
    this._weightUnitId$.next(this._weightUnitId);

    this.isEditMode = !!this._weightUnitId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(WeightUnitSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isGetWeightUnitProcess, isLanguagesProcess]) =>
        isGetWeightUnitProcess || isLanguagesProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(WeightUnitSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(WeightUnitSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCreateProcess, isUpdateProcess]) =>
        isCreateProcess || isUpdateProcess),
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

    this.weightUnit$ = combineLatest([
      this._store.select(WeightUnitSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([weightUnit, langs, defaultLang]) => !!weightUnit && !!defaultLang && !!langs),
      map(([weightUnit, langs, defaultLang]) => {
        return { ...weightUnit, contents: getCompiledContents(weightUnit.contents, langs, defaultLang) };
      })
    );

    this.weightUnit$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(weightUnit => {
      this._weightUnitId = weightUnit.id;
      this._weightUnitId$.next(this._weightUnitId);
      this.isEditMode = true;

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._weightUnitId,
        }
      });
    });

    if (!!this._weightUnitId) {
      this._store.dispatch(WeightUnitActions.getRequest({ id: this._weightUnitId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest({}));

    const prepareMainRequests$ = combineLatest([
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      map(([languages, defaultLanguage]) =>
        !!languages && !!defaultLanguage),
    );

    this.isPrepareToConfigure$ = this.weightUnitId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest([
          prepareMainRequests$,
          this.weightUnit$,
        ]).pipe(
          map(([prepareMainRequests, weightUnit]) =>
            !!prepareMainRequests && !!weightUnit),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(WeightUnitActions.clear());
    this._store.dispatch(LanguagesActions.clear());
  }

  onMainOptionsSave(weightUnit: IWeightUnit): void {
    if (this.isEditMode) {
      const normalizedWeightUnit: IWeightUnit = { ...weightUnit };

      // нормализация контена
      normalizeEntityContents(normalizedWeightUnit.contents, this._defaultLanguage.code);

      this._store.dispatch(WeightUnitActions.updateRequest({ id: weightUnit.id, weightUnit: normalizedWeightUnit }));
    } else {
      this._store.dispatch(WeightUnitActions.createRequest({ weightUnit }));
    }
  }

  onMainOptionsCancel(): void {
    this._router.navigate(["/admin/weightUnits"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/weightUnits"]);
  }
}

import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { WeightUnitsActions } from '@store/actions/weight-units.action';
import { WeightUnitsSelectors } from '@store/selectors/weight-units.selectors';
import { WeightUnitActions } from '@store/actions/weight-unit.action';
import { IWeightUnit, IRef, ILanguage } from '@djonnyx/tornado-types';
import { LanguagesSelectors, SettingsSelectors } from '@store/selectors';
import { map, filter } from 'rxjs/operators';
import { LanguagesActions } from '@store/actions/languages.action';
import { LayoutTypes } from '@components/state-panel/state-panel.component';
import { SettingsActions } from '@store/actions/settings.action';

@Component({
  selector: 'ta-weight-units-editor',
  templateUrl: './weight-units-editor.container.html',
  styleUrls: ['./weight-units-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightUnitsEditorContainer implements OnInit, OnDestroy {

  layoutType$: Observable<LayoutTypes>;

  displayInactiveEntities$: Observable<boolean>;

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IWeightUnit>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToShow$: Observable<boolean>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.layoutType$ = this._store.pipe(
      select(SettingsSelectors.selectWeightUnitsLayout),
    );

    this.displayInactiveEntities$ = this._store.pipe(
      select(SettingsSelectors.selectWeightUnitsInactiveVisibility),
    );

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(WeightUnitsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isProductsProgress, isLanguageProgress]) =>
        isProductsProgress || isLanguageProgress),
    );

    this.collection$ = this._store.pipe(
      select(WeightUnitsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(WeightUnitsSelectors.selectRefInfo),
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
      map(([collection, languages]) =>
        !!collection && !!languages),
    );

    this._store.dispatch(WeightUnitsActions.getAllRequest({}));
    this._store.dispatch(LanguagesActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    this._store.dispatch(WeightUnitsActions.clear());
    this._store.dispatch(LanguagesActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(WeightUnitActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(weightUnit: IWeightUnit): void {
    this._store.dispatch(WeightUnitActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: weightUnit.id, },
    });
  }

  onUpdate(weightUnit: IWeightUnit): void {
    this._store.dispatch(WeightUnitsActions.updateRequest({ id: weightUnit.id, weightUnit }));
  }

  onDelete(id: string): void {
    this._store.dispatch(WeightUnitsActions.deleteRequest({ id }));
  }

  onChangeLayout(layout: LayoutTypes): void {
    this._store.dispatch(SettingsActions.changeWeightUnitsLayout({ layout }));
  }

  onChangeDisplayInactiveEntities(showInactive: boolean): void {
    this._store.dispatch(SettingsActions.changeWeightUnitsVisibility({ showInactive }));
  }
}

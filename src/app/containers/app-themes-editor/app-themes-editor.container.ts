import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { AppThemesActions } from '@store/actions/app-themes.action';
import { AppThemesSelectors } from '@store/selectors/app-themes.selectors';
import { AppThemeActions } from '@store/actions/app-theme.action';
import { IAppTheme, IRef, IAsset, TerminalTypes } from '@djonnyx/tornado-types';
import { AppThemeAssetsSelectors } from '@store/selectors';
import { filter, map } from 'rxjs/operators';
import { getThemeDescriptor, ICompiledTheme } from '@app/utils/app-theme.util';
import { AppThemeAssetsActions } from '@store/actions/app-theme-assets.action';

@Component({
  selector: 'ta-app-themes-editor',
  templateUrl: './app-themes-editor.container.html',
  styleUrls: ['./app-themes-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemesEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<
    Array<ICompiledTheme>
  >;

  public assets$: Observable<Array<IAsset>>;

  isPrepareToShow$: Observable<boolean>;

  public refInfo$: Observable<IRef>;

  private _terminalType: TerminalTypes;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._terminalType = this._activatedRoute.snapshot.data.type;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(AppThemesSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AppThemeAssetsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isProductsProgress, isAssetsProgress]) =>
        isProductsProgress || isAssetsProgress),
    );

    this.collection$ = this._store.pipe(
      select(AppThemesSelectors.selectCollection),
      filter(c => !!c),
      map(c => c.map(theme => ({
        theme,
        descriptor: getThemeDescriptor(theme),
      }))),
    );

    this.assets$ = this._store.pipe(
      select(AppThemeAssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(AppThemesSelectors.selectRefInfo),
    );

    this.isPrepareToShow$ = combineLatest([
      this.collection$,
      this.assets$,
    ]).pipe(
      map(([collection, assets]) =>
        !!collection && !!assets),
    );

    this._store.dispatch(AppThemesActions.getAllRequest({
      terminalType: this._terminalType,
    }));

    this._store.dispatch(AppThemeAssetsActions.getAllRequest({
      options: {
        filter: [{
          id: 'type', operation: 'equals', value: this._terminalType,
        }],
      }
    }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(AppThemesActions.clear());
    this._store.dispatch(AppThemeAssetsActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(AppThemeActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(theme: IAppTheme): void {
    this._store.dispatch(AppThemeActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: theme.id, type: this._terminalType, },
    });
  }

  onUpdate(theme: IAppTheme): void {
    this._store.dispatch(AppThemesActions.updateRequest({ id: theme.id, theme }));
  }

  onDelete(id: string): void {
    this._store.dispatch(AppThemesActions.deleteRequest({ id }));
  }
}

import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { OrderTypesSelectors, OrderTypeAssetsSelectors, AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { OrderTypeAssetsActions } from '@store/actions/order-type-assets.action';
import { OrderTypeSelectors } from '@store/selectors/order-type.selectors';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { IOrderType, OrderTypeResourceTypes, ILanguage } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { normalizeEntityContents, getCompiledContents } from '@app/utils/entity.util';

@Component({
  selector: 'ta-order-type-creator',
  templateUrl: './order-type-creator.container.html',
  styleUrls: ['./order-type-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypeCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>; x

  isProcessAssets$: Observable<boolean>;

  rootNodeId$: Observable<string>;

  orderType$: Observable<IOrderType>;

  orderTypeAssets$: Observable<Array<IAsset>>;

  assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _orderTypeId: string;

  private _orderTypeId$ = new BehaviorSubject<string>(undefined);
  readonly orderTypeId$ = this._orderTypeId$.asObservable();

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._orderTypeId = this._activatedRoute.snapshot.queryParams["id"];
    this._orderTypeId$.next(this._orderTypeId);

    this.isEditMode = !!this._orderTypeId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(OrderTypeSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(OrderTypesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isGetOrderTypeProcess, isOrderTypesProcess, isAssetsProcess, isLanguagesProcess]) =>
        isGetOrderTypeProcess || isOrderTypesProcess || isAssetsProcess || isLanguagesProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(OrderTypeSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(OrderTypeSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess || isUpdateProcess),
    );

    this.isProcessAssets$ = combineLatest([
      this._store.pipe(
        select(OrderTypeAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(OrderTypeAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(OrderTypeAssetsSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) =>
        isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
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

    this.orderTypeAssets$ = combineLatest([
      this._store.select(OrderTypeAssetsSelectors.selectCollection),
      this.languages$,
    ]).pipe(
      filter(([assets, langs]) => !!assets && !!langs),
      switchMap(([assets, langs]) => {
        const result = new Array<IAsset>();

        for (const lang in assets) {
          result.push(...assets[lang]);
        }

        return of(result);
      }),
    );

    this.orderType$ = combineLatest([
      this._store.select(OrderTypeSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([orderType, langs, defaultLang]) => !!orderType && !!defaultLang && !!langs),
      map(([orderType, langs, defaultLang]) => {
        return { ...orderType, contents: getCompiledContents(orderType.contents, langs, defaultLang) };
      })
    );

    this.orderType$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(orderType => {
      this._orderTypeId = orderType.id;
      this._orderTypeId$.next(this._orderTypeId);
      this.isEditMode = true;

      this._store.dispatch(OrderTypeAssetsActions.getAllRequest({ orderTypeId: this._orderTypeId }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._orderTypeId,
        }
      });
    });

    if (!!this._orderTypeId) {
      this._store.dispatch(OrderTypeActions.getRequest({ id: this._orderTypeId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest({}));
    this._store.dispatch(AssetsActions.getAllRequest());

    const prepareMainRequests$ = combineLatest([
      this.languages$,
      this.defaultLanguage$,
      this.assets$,
    ]).pipe(
      map(([languages, defaultLanguage, assets]) =>
        !!languages && !!defaultLanguage && !!assets),
    );

    this.isPrepareToConfigure$ = this.orderTypeId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest([
          prepareMainRequests$,
          this.orderType$,
          this.orderTypeAssets$,
        ]).pipe(
          map(([prepareMainRequests, orderType, orderTypeAssets]) =>
            !!prepareMainRequests && !!orderType && !!orderTypeAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(OrderTypeActions.clear());
    this._store.dispatch(OrderTypeAssetsActions.clear());
    this._store.dispatch(LanguagesActions.clear());
    this._store.dispatch(AssetsActions.clear());
  }

  onMainResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(OrderTypeAssetsActions.uploadResourceRequest({ orderTypeId: this._orderTypeId, resourcesType: OrderTypeResourceTypes.MAIN, data }));
  }

  onIconResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(OrderTypeAssetsActions.uploadResourceRequest({ orderTypeId: this._orderTypeId, resourcesType: OrderTypeResourceTypes.ICON, data }));
  }

  onMainOptionsSave(orderType: IOrderType): void {
    if (this.isEditMode) {
      const normalizedOrderType: IOrderType = { ...orderType };

      // нормализация контена
      normalizeEntityContents(normalizedOrderType.contents, this._defaultLanguage.code);

      this._store.dispatch(OrderTypeActions.updateRequest({ id: orderType.id, orderType: normalizedOrderType }));
    } else {
      this._store.dispatch(OrderTypeActions.createRequest({ orderType }));
    }
  }

  onMainOptionsCancel(): void {
    this._router.navigate(["/admin/order-types"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/order-types"]);
  }
}

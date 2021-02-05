import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { StoreActions } from '@store/actions/store.action';
import { StoreSelectors } from '@store/selectors/store.selectors';
import { IStore, ITerminal } from '@djonnyx/tornado-types';
import { TerminalsActions } from '@store/actions/terminals.action';
import { TerminalsSelectors } from '@store/selectors';

@Component({
  selector: 'ta-store-creator',
  templateUrl: './store-creator.container.html',
  styleUrls: ['./store-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  store$: Observable<IStore>;

  terminals$: Observable<Array<ITerminal>>;

  isEditMode = false;

  private _storeEntityId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._storeEntityId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._storeEntityId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(StoreSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(StoreSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(TerminalsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isStoreGetProcess, isStoreUpdateProcess, isTerminalsGetProcess]) =>
        isStoreGetProcess || isStoreUpdateProcess || isTerminalsGetProcess),
    );

    this.store$ = this._store.pipe(
      select(StoreSelectors.selectEntity),
    );

    this.terminals$ = this._store.pipe(
      select(TerminalsSelectors.selectCollection),
    );

    this.store$.pipe(
      takeUntil(this.unsubscribe$),
      filter(store => !!store),
    ).subscribe(store => {
      this._storeEntityId = store.id;
      this.isEditMode = !!this._storeEntityId;

      this._store.dispatch(TerminalsActions.getAllRequest({
        options: {
          filter: [{ id: 'storeId', operation: 'equals', value: store.id }]
        },
      }));
    });

    if (!!this._storeEntityId) {
      this._store.dispatch(StoreActions.getRequest({ id: this._storeEntityId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(StoreActions.clear());
  }

  onSubmit(store: IStore): void {
    if (this.isEditMode) {
      this._store.dispatch(StoreActions.updateRequest({ id: store.id, store }));
    } else {
      this._store.dispatch(StoreActions.createRequest({ store }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/stores"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/stores"]);
  }
}

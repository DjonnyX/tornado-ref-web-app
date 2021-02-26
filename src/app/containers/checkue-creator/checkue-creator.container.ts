import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { CheckueActions } from '@store/actions/checkue.action';
import { CheckueSelectors } from '@store/selectors/checkue.selectors';
import { ICheckue } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-checkue-creator',
  templateUrl: './checkue-creator.container.html',
  styleUrls: ['./checkue-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckueCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  checkue$: Observable<ICheckue>;

  isEditMode = false;

  private _checkueId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._checkueId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._checkueId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(CheckueSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(CheckueSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCheckueGetProcess, selectIsUpdateProcess]) =>
        isCheckueGetProcess || selectIsUpdateProcess),
    );

    this.checkue$ = this._store.pipe(
      select(CheckueSelectors.selectEntity),
    );

    this.checkue$.pipe(
      takeUntil(this.unsubscribe$),
      filter(checkue => !!checkue),
      filter(checkue => this._checkueId !== checkue.id),
    ).subscribe(checkue => {
      this._checkueId = checkue.id;
      this.isEditMode = !!this._checkueId;
    });

    if (!!this._checkueId) {
      this._store.dispatch(CheckueActions.getRequest({ id: this._checkueId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(CheckueActions.clear());
  }

  onSubmit(checkue: ICheckue): void {
    if (this.isEditMode) {
      this._store.dispatch(CheckueActions.updateRequest({ id: checkue.id, checkue }));
    } else {
      this._store.dispatch(CheckueActions.createRequest({ checkue }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/currencies"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/currencies"]);
  }
}

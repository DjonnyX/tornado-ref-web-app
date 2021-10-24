import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base/base-component';
import { IBackupInfo } from '@djonnyx/tornado-types';
import { select, Store } from '@ngrx/store';
import { RefServerInfoActions } from '@store/actions/ref-server-info.action';
import { RefServerInfoSelectors } from '@store/selectors';
import { IAppState } from '@store/state';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ta-backups',
  templateUrl: './backups.container.html',
  styleUrls: ['./backups.container.scss']
})
export class BackupsContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public backupInfo$: Observable<IBackupInfo>;

  constructor(private _store: Store<IAppState>) {
    super();
  }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(RefServerInfoSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isRefServerInfoProcess]) =>
        isRefServerInfoProcess),
    );

    this.backupInfo$ = this._store.pipe(
      select(RefServerInfoSelectors.selectEntity),
    ).pipe(
      map(v => v?.backup),
    );

    this._store.dispatch(RefServerInfoActions.getRequest());
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._store.dispatch(RefServerInfoActions.clear());
  }
}

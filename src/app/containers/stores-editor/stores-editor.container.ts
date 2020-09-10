import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { StoresActions } from '@store/actions/stores.action';
import { StoresSelectors } from '@store/selectors/stores.selectors';
import { StoreActions } from '@store/actions/store.action';
import { IStore, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-stores-editor',
  templateUrl: './stores-editor.container.html',
  styleUrls: ['./stores-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IStore>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(StoresActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(StoresSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(StoresSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(StoreActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(store: IStore): void {

    this._store.dispatch(StoreActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: store.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(store: IStore): void {
    this._store.dispatch(StoresActions.updateRequest({id: store.id, store}));
  }

  onDelete(id: string): void {
    this._store.dispatch(StoresActions.deleteRequest({ id }));
  }
}

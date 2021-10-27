import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { TarifsActions } from '@store/actions/tarifs.action';
import { TarifsSelectors } from '@store/selectors/tarifs.selectors';
import { TarifActions } from '@store/actions/tarif.action';
import { ITarif, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-tarifs-editor',
  templateUrl: './tarifs-editor.container.html',
  styleUrls: ['./tarifs-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarifsEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ITarif>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(TarifsActions.getAllRequest({}));

    this.isProcess$ = this._store.pipe(
      select(TarifsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(TarifsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(TarifsSelectors.selectRefInfo),
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(TarifsActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(TarifActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(tarif: ITarif): void {
    this._store.dispatch(TarifActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: tarif.id, },
    });
  }

  onUpdate(tarif: ITarif): void {
    this._store.dispatch(TarifsActions.updateRequest({id: tarif.id, tarif}));
  }

  onDelete(id: string): void {
    this._store.dispatch(TarifsActions.deleteRequest({ id }));
  }
}

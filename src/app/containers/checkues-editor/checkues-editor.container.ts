import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckuesActions } from '@store/actions/checkues.action';
import { CheckuesSelectors } from '@store/selectors/checkues.selectors';
import { CheckueActions } from '@store/actions/checkue.action';
import { ICheckue, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-checkues-editor',
  templateUrl: './checkues-editor.container.html',
  styleUrls: ['./checkues-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckuesEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ICheckue>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(CheckuesActions.getAllRequest({}));

    this.isProcess$ = this._store.pipe(
      select(CheckuesSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(CheckuesSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(CheckuesSelectors.selectRefInfo),
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(CheckuesActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(CheckueActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(checkue: ICheckue): void {
    this._store.dispatch(CheckueActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: checkue.id, },
    });
  }

  onUpdate(checkue: ICheckue): void {
    this._store.dispatch(CheckuesActions.updateRequest({id: checkue.id, checkue}));
  }

  onUpdateAll(checkue: ICheckue): void {
    this._store.dispatch(CheckuesActions.updateRequest({id: checkue.id, checkue, setDafault: true}));
  }

  onDelete(id: string): void {
    this._store.dispatch(CheckuesActions.deleteRequest({ id }));
  }
}

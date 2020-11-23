import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationsActions } from '@store/actions/applications.action';
import { ApplicationsSelectors } from '@store/selectors/applications.selectors';
import { ApplicationActions } from '@store/actions/application.action';
import { IApplication, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-applications-editor',
  templateUrl: './applications-editor.container.html',
  styleUrls: ['./applications-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IApplication>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(ApplicationsActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(ApplicationsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(ApplicationsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(ApplicationsSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(ApplicationActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(application: IApplication): void {

    this._store.dispatch(ApplicationActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: application.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(application: IApplication): void {
    this._store.dispatch(ApplicationsActions.updateRequest({id: application.id, application}));
  }

  onDelete(id: string): void {
    this._store.dispatch(ApplicationsActions.deleteRequest({ id }));
  }
}

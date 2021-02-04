import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { IntegrationsSelectors } from '@store/selectors/integrations.selectors';
import { IntegrationActions } from '@store/actions/integration.action';
import { IIntegration, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-integrations-editor',
  templateUrl: './integrations-editor.container.html',
  styleUrls: ['./integrations-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IIntegration>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(IntegrationsActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(IntegrationsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(IntegrationsSelectors.selectRefInfo),
    );
  }

  onEdit(integration: IIntegration): void {
    this._store.dispatch(IntegrationActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: integration.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(integration: IIntegration): void {
    this._store.dispatch(IntegrationsActions.updateRequest({id: integration.id, integration}));
  }
}

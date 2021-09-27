import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { formatNodeModel } from '@app/utils/node.util';
import { NodeTypes } from '@djonnyx/tornado-types';

@Injectable()
export default class MenuNodesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRootNodeIdRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.getRootNodeIdRequest),
            switchMap(({ options }) => {
                return this._apiService.getRootNodes(options).pipe(
                    map(res => res.data),
                    mergeMap(nodes => of(nodes.find(node => node.type === NodeTypes.KIOSK_ROOT))),
                    map(kioskRootNode => kioskRootNode.id),
                    mergeMap(rootNodeId => {
                        return [MenuNodesActions.getRootNodeIdSuccess({ rootNodeId })];
                    }),
                    catchError((error: Error) => {
                        return of(MenuNodesActions.getRootNodeIdError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.getAllRequest),
            switchMap(({ id }) => {
                return this._apiService.getNodes(id).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(MenuNodesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.createRequest),
            switchMap(({ node }) => {
                return this._apiService.createNode(formatNodeModel(node)).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.createSuccess({ changed: res.data.changed, created: res.data.created, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(MenuNodesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createMultiRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.createMultiRequest),
            switchMap(({ nodes }) => {
                return this._apiService.createNodes(nodes.map(n => formatNodeModel(n))).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.createMultiSuccess({ changed: res.data.changed, created: res.data.created, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(MenuNodesActions.createMultiError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.updateRequest),
            switchMap(({ id, node }) => {
                return this._apiService.updateNode(id, formatNodeModel(node)).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.updateSuccess({ node: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(MenuNodesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteNode(id).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.deleteSuccess({ deleted: res.data.deleted, changed: res.data.changed, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(MenuNodesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}

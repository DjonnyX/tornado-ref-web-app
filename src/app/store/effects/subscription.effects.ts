import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { SubscriptionActions } from '@store/actions/subscription.action';
import { formatSubscriptionModel } from '@app/utils/subscription.util';

@Injectable()
export default class SubscriptionEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SubscriptionActions.getRequest),
            switchMap(({id, extended}) => {
                return this._apiService.getSubscription(id, extended).pipe(
                    mergeMap(res => {
                        return [SubscriptionActions.getSuccess({ subscription: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SubscriptionActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SubscriptionActions.createRequest),
            switchMap(({ subscription }) => {
                return this._apiService.createSubscription(formatSubscriptionModel(subscription)).pipe(
                    mergeMap(res => {
                        return [SubscriptionActions.createSuccess({ subscription: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SubscriptionActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SubscriptionActions.updateRequest),
            switchMap(({ id, subscription }) => {
                return this._apiService.updateSubscription(id, formatSubscriptionModel(subscription)).pipe(
                    mergeMap(res => {
                        return [SubscriptionActions.updateSuccess({ subscription: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SubscriptionActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}

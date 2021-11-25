import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { SubscriptionsActions } from '@store/actions/subscriptions.action';
import { formatSubscriptionModel } from '@app/utils/subscription.util';

@Injectable()
export default class SubscriptionsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SubscriptionsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getSubscriptions(options).pipe(
                    mergeMap(res => {
                        return [SubscriptionsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(SubscriptionsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SubscriptionsActions.updateRequest),
            switchMap(({ id, subscription }) => {
                return this._apiService.updateSubscription(id, formatSubscriptionModel(subscription)).pipe(
                    mergeMap(res => {
                        return [SubscriptionsActions.updateSuccess({ subscription: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(SubscriptionsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SubscriptionsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteSubscription(id).pipe(
                    mergeMap(res => {
                        return [SubscriptionsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(SubscriptionsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}

import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
    template: '',
})
export abstract class BaseComponent implements OnDestroy {
    protected unsubscribe$ = new Subject<void>();

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.unsubscribe$ = null;
    }
}
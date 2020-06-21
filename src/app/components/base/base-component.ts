import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class BaseComponent implements OnDestroy {
    protected unsubscribe$ = new Subject<void>();

    ngOnDestroy(): void {
        this.unsubscribe$.complete();
        this.unsubscribe$ = null;
    }
}
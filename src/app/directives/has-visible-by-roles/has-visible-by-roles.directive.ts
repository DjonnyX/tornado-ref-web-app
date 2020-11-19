import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@app/services/auth.service';
import { BaseComponent } from '@components/base/base-component';

@Directive({
  selector: '[hasVisibleByRoles]'
})
export class HasVisibleByRolesDirective extends BaseComponent implements OnInit, OnDestroy {
  @Input() hasVisibleByRoles = new Array<string>();

  constructor(
    private _authService: AuthService,
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this._authService.profile$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(p => {
      this.updateView();
    });
  }

  private updateView() {
    const hasAuthority = this._authService.isAuthenticated && this._authService.hasAuthority(this.hasVisibleByRoles);
    if (hasAuthority) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }
}
import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Renderer2, TemplateRef } from '@angular/core';
import { QueryProgressComponent } from './query-progress.component';

@Directive({
  selector: '[queryProgress]'
})
export class QueryProgressDirective {

  @Input() queryProgress: boolean = false;

  constructor(
    private _container: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _resolver: ComponentFactoryResolver,
    private _renderer: Renderer2) { }

  ngOnChanges() {

    this._container.clear();
    const embeddedView = this._container.createEmbeddedView(this._templateRef, { queryProgress: this.queryProgress });

    if (this.queryProgress) {
      const factory = this._resolver.resolveComponentFactory(QueryProgressComponent);
      const componentRef = this._container.createComponent(factory);
      if (embeddedView.rootNodes.length > 0) {
        this._renderer.insertBefore(
          embeddedView.rootNodes[0],
          componentRef.location.nativeElement,
          embeddedView.rootNodes[0].firstChild
        );
      }
    }
  }
}

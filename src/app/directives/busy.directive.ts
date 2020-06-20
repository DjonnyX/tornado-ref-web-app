import { Directive, ViewContainerRef, ComponentFactoryResolver, Compiler, ComponentRef, Input, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { BusyIndicatorComponent } from '@components/busy-indicator/busy-indicator.component';

@Directive({
  selector: '[busy]'
})
export class BusyDirective {

  @Input() busy: boolean = false;

  constructor(
    private _container: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _resolver: ComponentFactoryResolver,
    private _renderer: Renderer2) { }

  ngOnChanges() {

    this._container.clear();
    const embeddedView = this._container.createEmbeddedView(this._templateRef, { busy: this.busy });

    if (this.busy) {
      const factory = this._resolver.resolveComponentFactory(BusyIndicatorComponent);
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

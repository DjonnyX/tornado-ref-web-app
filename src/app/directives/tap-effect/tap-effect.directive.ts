import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tapEffect]'
})
export class TapEffectDirective {

  @Input() tapEffect: HTMLElement;

  constructor(private _host: ElementRef<HTMLElement>) { }

  @HostListener('pointerenter') onEnter() {
    let element: HTMLElement;
    element = this.tapEffect ? this.tapEffect : this._host.nativeElement;
    element.classList.add("hit");
  }

  @HostListener('pointerleave') onLeave() {
    let element: HTMLElement;
    element = this.tapEffect ? this.tapEffect : this._host.nativeElement;
    element.classList.remove("hit");
    element.classList.remove("pressed");
  }

  @HostListener('pointerdown') onDown() {
    let element: HTMLElement;
    element = this.tapEffect ? this.tapEffect : this._host.nativeElement;
    element.classList.add("pressed");
  }

  @HostListener('pointerup') onUp() {
    let element: HTMLElement;
    element = this.tapEffect ? this.tapEffect : this._host.nativeElement;
    element.classList.remove("pressed");
  }
}
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[tapEffect]'
})
export class TapEffectDirective {

  constructor(private _host: ElementRef<HTMLElement>) { }

  @HostListener('pointerenter') onEnter() {
    this._host.nativeElement.classList.add("hit");
  }

  @HostListener('pointerleave') onLeave() {
    this._host.nativeElement.classList.remove("hit");
  }

  @HostListener('pointerdown') onDown() {
    this._host.nativeElement.classList.add("pressed");
  }

  @HostListener('pointerup') onUp() {
    this._host.nativeElement.classList.remove("pressed");
  }
}
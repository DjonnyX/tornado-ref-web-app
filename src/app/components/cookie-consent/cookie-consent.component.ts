import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ts-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookieConsentComponent implements OnInit, OnDestroy {

  public isAccepted: boolean = false;
  public hideProcess: boolean = false;

  private satateKey = 'ta_consent';

  @ViewChild('consent', {static: false}) consentContainer: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if(document.cookie.indexOf(`${this.satateKey}=`)) {
      let storedState = this.restore(this.satateKey);
      this.isAccepted = !!storedState && storedState === 'true';
    } else 
    {
      this.isAccepted = false;
    }
  }

  ngAfterViewInit() {
    if(!!this.consentContainer)
      this.consentContainer.nativeElement.addEventListener("transitionend", this._handleTransitionEnd);
  }

  ngOnDestroy(): void {
    if(!!this.consentContainer)
      this.consentContainer.nativeElement.removeEventListener("transitionend", this._handleTransitionEnd);
    if(this.hideProcess)
      this.hideProcess = false;
  }

  public onAccept() {
    this.hideProcess = true;
    this.isAccepted = true;
    this.store(this.satateKey, String(this.isAccepted));
    this.cdr.detectChanges();
  }

  private restore(name: string) {
    return localStorage.getItem(name);
  }

  private store(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  private _handleTransitionEnd = (args) => {
    if(!!args && args.propertyName === 'transform') {
      this.hideProcess = false;
      this.cdr.detectChanges();
    }
  }

}

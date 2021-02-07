import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ta-cookie-term-of-use',
  templateUrl: './cookie-term-of-use.component.html',
  styleUrls: ['./cookie-term-of-use.component.scss']
})
export class CookieTermOfUseComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this._router.navigate(['admin']);
  }
}
